// 分红方式
export const dividendTypeList: Array<any> = [
  { code: '1', name: '现金分红', type: 'success' },
  { code: '0', name: '红利再投', type: 'danger' },
];

// 巨额赎回
export const vastredeemFlagList: Array<any> = [
  { code: '0', name: '取消', type: '' },
  { code: '1', name: '顺延', type: 'success' },
];
// 委托方向
export const businessCodeList: Array<any> = [
  { code: '22', name: '基金认/申购', names: '申购', alisa: '认/申购指令', type: 'choose' },
  { code: '20', name: '基金认购', names: '认购', alisa: '认购指令', type: 'choose' },
  { code: '24', name: '基金赎回', names: '赎回', alisa: '赎回指令', type: 'fundSell' },
  { code: '361', name: '货基转换', names: '货基转换', alisa: '货基转换指令', type: 'moneyFundChange' },
  { code: '36', name: '基金转换', names: '基金转换', alisa: '基金转换指令', type: 'fundSell' },
  { code: '25', name: '预约赎回', names: '预约赎回', alisa: '货基转换指令', type: 'moneyFundChange' },
  { code: '29', name: '修改分红方式', names: '修改分红方式', alisa: '修改分红方式', type: 'moneyFundChange' },
];
// 账户类型
export const accountTypeList: Array<any> = [
  { code: '0', name: '机构账户' },
  { code: '1', name: '产品账户' },
];
// 交易状态
export const orderStatusList = [
  { code: '01', name: '待受理', color: '' },
  { code: '02', name: '受理中', color: '' },
  { code: '03', name: '申请失败', color: 'danger' },
  { code: '04', name: '待支付', color: '' },
  { code: '05', name: '支付失败', color: 'danger' },
  { code: '06', name: '支付成功', color: '' },
  { code: '07', name: '已撤单', color: '' },
  { code: '08', name: '已报', color: '' },
  { code: '09', name: '确认成功', color: '' },
  { code: '10', name: '确认失败', color: '' },
  { code: '11', name: '撤单已回款', color: '' },
  { code: '12', name: '申请成功', color: '' },
  { code: '14', name: '已作废', color: '' },
  { code: '16', name: '预约赎回成功', color: '' },
  { code: '17', name: '修改分红方式申请成功', color: '' },
  { code: '99', name: '受理中', color: '' },
];
// 交易类型（好像不太通用的样子）
export const businessList: Array<any> = [
  { businessName: '所有类型', businessCode: '' },
  { businessName: '认购', businessCode: '20' },
  { businessName: '申购', businessCode: '22' },
  { businessName: '赎回', businessCode: '24' },
  { businessName: '预约赎回', businessCode: '25' },
  { businessName: '货基转换', businessCode: '361' },
  { businessName: '基金转换', businessCode: '36' },
  { businessName: '强行赎回', businessCode: '42' },
  { businessName: '分红', businessCode: '43' },
  { businessName: '修改分红方式', businessCode: '29' },
  { businessName: '强行调增', businessCode: '44' },
  { businessName: '强行调减', businessCode: '45' },
  { businessName: '认购结果', businessCode: '30' },
  { businessName: '基金募集失败', businessCode: '49' },
];
// 收费类型
export const shareTypeList: Array<any> = [
  { code: 'A', name: '前端收费' },
  { code: 'B', name: '后端收费' },
];
// 手机号码前缀
export const moilePrefixList: Array<any> = [
  { value: '86', code: '+86', name: '中国+86', reg: /^1[3456789]\d{9}$/ },
  // { value: '852', code: '+852', name: '中国香港特别行政区+852', reg: /^[456789]{1}\d{7}$/ },
  // { value: '853', code: '+853', name: '中国澳门特别行政区+853', reg: /^([6]\d{5})$/ },
];
export const adminIdList: Array<any> = [
  { value: '0', name: '身份证', len: 18 },
  { value: '1', name: '护照', len: 9 },
  { value: '2', name: '军官证', len: 7 },
  { value: '3', name: '士兵证', len: 8 },
  { value: '4', name: '港澳居民来往内地通行证', len: 9 },
  { value: '5', name: '户口本', len: 9 },
  { value: '6', name: '外国护照' },
  { value: '7', name: '其它' },
  { value: '8', name: '文职证' },
  { value: '9', name: '警官证' },
  { value: 'A', name: '台胞证' },
  { value: 'B', name: '外国人永久居留证' },
];