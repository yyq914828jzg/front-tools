import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { stringify } from 'qs';
import isFunction from 'lodash/isFunction';
import cloneDeep from 'lodash/cloneDeep';
import { CreateAxiosOptions } from './AxiosTransform';
import { AxiosCanceler } from './AxiosCancel';
import { AxiosRequestConfigRetry, RequestOptions, Result } from '@/types/axios';
import { storage } from '@/utils/Storage';
import { StorageName } from '@/enums/pageEnum';
import myAes from './aes.js';
// Axios模块
export class VAxios {
  // axios句柄
  private instance: AxiosInstance;

  // axios选项
  private readonly options: CreateAxiosOptions;

  constructor(options: CreateAxiosOptions) {
    this.options = options;
    this.instance = axios.create(options);
    this.setupInterceptors();
  }

  // 创建axios句柄
  private createAxios(config: CreateAxiosOptions): void {
    this.instance = axios.create(config);
  }

  // 获取数据处理
  private getTransform() {
    const { transform } = this.options;
    return transform;
  }

  // 获取句柄
  getAxios(): AxiosInstance {
    return this.instance;
  }

  // 配置 axios
  configAxios(config: CreateAxiosOptions) {
    if (!this.instance) {
      return;
    }
    this.createAxios(config);
  }

  // 设置通用头信息
  setHeader(headers: Object) {
    if (!this.instance) {
      return;
    }

    Object.assign(this.instance.defaults.headers, headers);
  }

  // 设置拦截器
  private setupInterceptors() {
    const transform = this.getTransform();
    if (!transform) {
      return;
    }
    const { requestInterceptors, requestInterceptorsCatch, responseInterceptors, responseInterceptorsCatch } =
      transform;
    const axiosCanceler = new AxiosCanceler();

    // 请求配置处理
    this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
      const {
        headers: { ignoreRepeatRequest },
      } = config;
      const ignoreRepeat = ignoreRepeatRequest ?? this.options.requestOptions?.ignoreRepeatRequest;
      if (!ignoreRepeat) axiosCanceler.addPending(config);

      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config, this.options);
      }

      if (
        storage.get(StorageName.USER_KEY_INFO) &&
        storage.get(StorageName.USER_KEY_INFO).encryptionFlag &&
        config.headers.encryptionFlag
      ) {
        // 加密
        const { mobile } = storage.get(StorageName.USER_KEY_INFO);
        const { encryptKey } = storage.get(StorageName.USER_KEY_INFO);
        const requestData = myAes.encryptAndSignData(config.data, mobile, encryptKey);
        config.data = requestData;
      } else {
        // 不加密
      }
      return config;
    }, undefined);

    // 请求错误处理
    if (requestInterceptorsCatch && isFunction(requestInterceptorsCatch)) {
      this.instance.interceptors.request.use(undefined, requestInterceptorsCatch);
    }

    // 响应结果处理
    this.instance.interceptors.response.use((res: AxiosResponse) => {
      if (res) axiosCanceler.removePending(res.config);
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res);
      }
      if (
        storage.get(StorageName.USER_KEY_INFO) &&
        storage.get(StorageName.USER_KEY_INFO).encryptionFlag &&
        res.config.headers.encryptionFlag
      ) {
        // 加密
        const { decryptKey } = storage.get(StorageName.USER_KEY_INFO);
        // 响应解密
        const responseEn = res.data;
        // 解密
        try {
          const responseData = myAes.decryptAndSignData(responseEn, decryptKey);

          if (responseData.retCode === '990113') {
            res.data = responseData;
          } else {
            res.data = JSON.parse(responseData);
          }
          return res;
        } catch (error) {
          return res;
        }
      } else {
        // 不加密
        return res;
      }
    }, undefined);

    // 响应错误处理
    if (responseInterceptorsCatch && isFunction(responseInterceptorsCatch)) {
      this.instance.interceptors.response.use(undefined, responseInterceptorsCatch);
    }
  }

  // 支持Form Data
  supportFormData(config: AxiosRequestConfig) {
    const headers = config.headers || this.options.headers;
    const contentType = headers?.['Content-Type'] || headers?.['content-type'];

    if (
      contentType !== 'application/x-www-form-urlencoded;charset=UTF-8' ||
      !Reflect.has(config, 'data') ||
      config.method?.toUpperCase() === 'GET'
    ) {
      return config;
    }

    return {
      ...config,
      data: stringify(config.data, { arrayFormat: 'brackets' }),
    };
  }

  get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options, false);
  }

  post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options, false);
  }

  postRes<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options, true);
  }

  put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options, false);
  }

  delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options, false);
  }

  patch<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'PATCH' }, options, false);
  }

  // 请求
  async request<T = any>(
    config: AxiosRequestConfigRetry,
    options?: RequestOptions,
    encryptionFlag?: boolean,
  ): Promise<T> {
    this.setHeader({ encryptionFlag });
    let conf: CreateAxiosOptions = cloneDeep(config);
    const transform = this.getTransform();

    const { requestOptions } = this.options;

    const opt: RequestOptions = { ...requestOptions, ...options };

    const { beforeRequestHook, requestCatchHook, transformRequestHook } = transform || {};
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt);
    }
    conf.requestOptions = opt;

    conf = this.supportFormData(conf);

    return new Promise((resolve, reject) => {
      this.instance
        .request<any, AxiosResponse<Result>>(!config.retryCount ? conf : config)
        .then((res: AxiosResponse<Result>) => {
          console.log('请求数据：', conf.data, conf.url);
          console.log('响应数据：', res && res.data && res.data);
          console.log('=======================================');
          if (transformRequestHook && isFunction(transformRequestHook)) {
            try {
              const ret = transformRequestHook(res, opt);
              resolve(ret);
            } catch (err) {
              reject(err || new Error('请求错误!'));
            }
            return;
          }
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt));
            return;
          }
          if (axios.isAxiosError(e)) {
            // 在这里重写Axios的错误信息
          }
          reject(e);
        });
    });
  }
}
