import { adminIdList, moilePrefixList } from '@/utils/constant';
/*
 * 手机号码验证
 * mobileType  手机号码类型，86 853等，可以不传
 */
export const mobileValidate = (rule, value, callback) => {
  const fgMobileType = !!rule.mobileType;
  if (value === '') {
    callback(new Error('请输入手机号码'));
  } else if (fgMobileType && !moilePrefixList.find((el) => el.value === rule.mobileType).reg.test(value)) {
    callback(new Error('手机号码格式不正确'));
  } else if (!fgMobileType && !moilePrefixList[0].reg.test(value)) {
    callback(new Error('手机号码格式不正确'));
  } else {
    callback();
  }
};
/*
 * 密码验证
 *fgPwd1 页面设置,是否是再次输入
 * pwd 页面设置, 再次输入密码的值
 */
export const pwdValidate = (rule, value, callback) => {
  if (value === '') {
    callback(new Error(rule.fgPwd1 ? '请再次输入密码' : '请输入密码'));
  } else if (String(value).indexOf(' ') >= 0) {
    callback(new Error('密码不能有空格'));
  } else if (value.length < 6 || value.length > 16) {
    callback(new Error('请输入6-16位密码'));
  } else if (rule.pwd && value !== rule.pwd) {
    callback(new Error('两次输入密码不一致'));
  } else {
    callback();
  }
};

export const pwdValidate2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error(rule.fgPwd1 ? '请再次输入密码' : '请输入密码'));
  } else if (String(value).indexOf(' ') >= 0) {
    callback(new Error('密码不能有空格'));
  } else if (value.length < 6 || value.length > 16) {
    callback(new Error('请输入6-16位密码'));
  } else if (passwordLevel(value) < 2) {
    callback(new Error('密码必须包含字母、数字、符号中的2种'));
  } else if (rule.pwd && value !== rule.pwd) {
    callback(new Error('两次输入密码不一致'));
  } else {
    callback();
  }
};
/*
 * 证件号码验证
 * codeType  证件类型,在页面写
 */
export const codeValidate = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入证件号码'));
  } else if (
    rule.codeType &&
    adminIdList.find((el) => el.value === rule.codeType) &&
    adminIdList.find((el) => el.value === rule.codeType).len &&
    value.length !== adminIdList.find((el) => el.value === rule.codeType).len
  ) {
    const obj = adminIdList.find((el) => el.value === rule.codeType);
    callback(new Error(`${obj.name}长度为${obj.len}位`));
  } else if (
    rule.codeTypeArr &&
    rule.codeTypeArr.length &&
    rule.codeTypeArr.length > 0 &&
    rule.codeTypeArr[0] !== '0' &&
    adminIdList.find((el) => el.value === rule.codeTypeArr[1]) &&
    adminIdList.find((el) => el.value === rule.codeTypeArr[1]).len &&
    value.length !== adminIdList.find((el) => el.value === rule.codeTypeArr[1]).len
  ) {
    const obj = adminIdList.find((el) => el.value === rule.codeTypeArr[1]);
    callback(new Error(`${obj.name}长度为${obj.len}位`));
  } else if (value.length > 40) {
    callback(new Error('证件号码长度不正确'));
  } else {
    callback();
  }
};
/*
 * 企业邮箱验证
 *
 */
export const emailValidate = (_rule, value, callback) => {
  const arr = ['qq.com', '163.com', 'sohu.com', 'sina.com.cn', '10086.cn', '189.cn', 'wo.cn', 'tom.com', 'aliyun.com'];
  if (value === '') {
    callback(new Error('请输入邮箱'));
  } else if (arr.find((el) => value.includes(el))) {
    callback(new Error('请输入企业邮箱'));
  } else {
    callback();
  }
};
export function passwordLevel(password) {
  let Modes = 0;
  for (let i = 0; i < password.length; i++) {
    Modes |= CharMode(password.charCodeAt(i));
  }
  return bitTotal(Modes);
  // CharMode函数
  function CharMode(iN) {
    if (iN >= 48 && iN <= 57)
      // 数字
      return 1;
    if (iN >= 65 && iN <= 90)
      // 大写字母
      return 2;
    if ((iN >= 97 && iN <= 122) || (iN >= 65 && iN <= 90))
      // 大小写
      return 4;
    return 8; // 特殊字符
  }
  // bitTotal函数
  function bitTotal(num) {
    let modes = 0;
    for (let i = 0; i < 4; i++) {
      if (num & 1) modes++;
      num >>>= 1;
    }
    return modes;
  }
}

/*
 * 基金账号验证
 * fgPwd1 页面设置,是否是再次输入
 * pwd 页面设置, 再次输入密码的值
 */
export const accountIdValidate = (_rule, value, callback) => {
  // eslint-disable-next-line prefer-regex-literals
  const pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
  if (value === '') {
    callback(new Error('请输入登记的基金账号,长度12位'));
  } else if (pattern.test(value)) {
    callback(new Error('基金账号包含特殊字符'));
  } else if (value.length !== 12) {
    callback(new Error('基金账号长度不是12位'));
  } else {
    callback();
  }
};

/*
 * 产品简称验证
 */
export const validateCustName = (_rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入产品简称'));
  } else if (String(value).length > 20) {
    callback(new Error('产品简称长度不能超过20个字符'));
  } else {
    callback();
  }
};
/*
 * 产品证件号码验证
 */
export const validateCode = (_rule, value, callback) => {
  if (value.length > 40) {
    callback(new Error('证件号码长度不正确'));
  } else {
    callback();
  }
};
