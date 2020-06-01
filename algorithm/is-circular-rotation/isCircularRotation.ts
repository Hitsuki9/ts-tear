/**
 * 判断两个字符串是否是回环变位
 * @param str1
 * @param str2
 */
export default function isCircularRotation(str1: string, str2: string) {
  return str1.length === str2.length && (str1 + str1).indexOf(str2) > -1;
}
