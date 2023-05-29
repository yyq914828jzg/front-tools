
/*
 *计算table dom组件高度
 */
export function tableMaxHeight(domY, innerHeight, isPage) {
  // alert(isPage ? innerHeight - domY - 80 : innerHeight - domY - 32)
  console.log(innerHeight, domY);
  return isPage ? innerHeight - domY - 80 : innerHeight - domY - 32;
}

/*
 *时间转换 20220102 -> 2022-01-02
 */
export function timeTrans(time) {
  let str = '';
  if (time) {
    if (time === '') {
      str = '--';
    } else {
      switch (time.length) {
        case 4:
          str = time;
          break;
        case 6:
          str = `${time.slice(0, 4)}-${time.slice(4, 6)}`;
          break;
        default:
          str = `${time.slice(0, 4)}-${time.slice(4, 6)}-${time.slice(6, 8)}`;
          break;
      }
    }
  }

  return str;
}
