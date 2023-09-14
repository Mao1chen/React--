const VIEW_TITLE = "知乎日报";
const ROUTES_WHITE = ["/personal"];
const TRANSITIONUPPERCASEARRAYLIST = ["Not", "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
const REG_REGULAR = {
  phoneReg: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/,
  codeReg: /^\d{6}$/,
};
export default { VIEW_TITLE, ROUTES_WHITE, REG_REGULAR, TRANSITIONUPPERCASEARRAYLIST };
