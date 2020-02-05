/**
 * 以指定字符补全字符串至指定位数
 * @param str 需要补全的字符串
 * @param len 需要补全至的位数
 * @param ch 补全字符
 */
export default function leftPad(str: string, len: number, ch = ' ') {
  let length = len - str.length;
  let res = '';
  while (length) {
    if (length % 2 === 1) res += ch;
    if (length === 1) return res + str;
    ch += ch;
    length = Math.floor(length / 2);
  }
}
