/**
 * 日期操作工具
 */

/**
 *   对Date的扩展，将 Date 转化为指定格式的String
 *   月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *   年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *   例子：
 *   (new Date()).Format('yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
 *   (new Date()).Format('yyyy-M-d h:m:s.S')      ==> 2006-7-2 8:9:4.18
 */
const fmtDate = (date, fmt) => {
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length));
    }
  }
  return fmt;
};

const dateFormat = (fmt, date) => {
  if (date) {
    let ret;
    const opt = {
      'Y+': date.getFullYear().toString(), // 年
      'm+': (date.getMonth() + 1).toString(), // 月
      'd+': date.getDate().toString(), // 日
      'H+': date.getHours().toString(), // 时
      'M+': date.getMinutes().toString(), // 分
      'S+': date.getSeconds().toString(), // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (const k in opt) {
      ret = new RegExp(`(${k})`).exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'));
      }
    }
    return fmt;
  }
  return '';
};

export default {
  getDateFormat: (fmt, date) => {
    return dateFormat(fmt, date);
  },
  getLastTimeStr: (time) => {
    // 时间戳转换 'yyyy-MM-dd'
    return time === '' ? '' : fmtDate(new Date(parseInt(time)), 'yyyy-MM-dd');
  },
  getLastHourStr: (time) => {
    // 时间戳转换 'yyyy-MM-dd hh:mm:ss'
    return fmtDate(new Date(parseInt(time)), 'yyyy-MM-dd hh:mm:ss');
  },
  getLastPureStr: (time) => {
    // 时间戳转换 'yyyyMMdd'
    return fmtDate(new Date(parseInt(time)), 'yyyyMMdd');
  },
  getLastMinStr: (time) => {
    // 时间戳转换 yyyyMMdd hh:mm
    return fmtDate(new Date(parseInt(time)), 'yyyyMMdd hh:mm');
  },
  getLastMonStr: (time) => {
    // 时间戳转换 yyyy-MM
    return fmtDate(new Date(parseInt(time)), 'yyyy-MM');
  },
  getMonthAndDay: (time) => {
    // 时间戳转换 MM/dd
    if (time) {
      const date = fmtDate(new Date(parseInt(time)), 'yyyy-MM-dd');
      return `${date.split('-')[1]}/${date.split('-')[2]}`;
    }
  },
  getLastTimeStrMs: (date) => {
    // 日期转化时间戳
    if (date) {
      const newdate = new Date(Date.parse(date.replace(/-/g, '/')));

      return newdate.getTime();
    }
  },
  getMonthStartDate: (date) => {
    const paraYear = date.getFullYear();
    const paraMonth = date.getMonth();
    return new Date(paraYear, paraMonth, 1);
  },
  // 根据出生日期获取年龄
  getAgeByTime: (time) => {
    if (time === '') return '';
    const current = Date.parse(new Date());
    return parseInt((current - time) / 31536000000);
  },

  // utc标准时间转化 yyyy-MM-dd
  getTimeByUtc: (time, isTimeStemp) => {
    const date = new Date(time);
    if (isTimeStemp) return date.getTime();
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = date.getDate() + 1 < 10 ? `0${date.getDate()}` : date.getDate();
    return `${year}-${month}-${day}`;
  },

  // utc标准时间字符串转时间戳
  getTimestampByUtc: (time) => {
    const date = new Date(time);
    return date.getTime();
  },

  // 时间戳转utc
  getUtcByTime: (time) => {
    return `${Date.UTC(time)}`;
  },
  // 获取日期区间的起始日期,传参类型:arr
  getStartDate: (date) => {
    return `${date[0]} 00:00:00`;
  },

  // 获取日期区间的结束日期,传参类型:arr
  getEndDate: (date) => {
    return `${date[1]} 23:59:59`;
  },
};
