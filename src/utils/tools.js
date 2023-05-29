const tools = {

  // 金额三位加“,”
  turnMoney: (n, length = 3) => {
    if (n === '' || n === null || n === undefined) {
      return '--';
    }
    n = String(n).split('.');
    n[0] = n[0].replace(new RegExp(`(\\d)(?=(\\d{${length}})+$)`, 'ig'), '$1,');
    return n.join('.');
  },
 
  
};
export default tools;
