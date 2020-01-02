/**
 * 中划线式命名转换驼峰式命名
 * @param str 字符串
 */
export default function hyphenToCamelCase(str: string) {
  return str.replace(/-\w/g, (chars) => {
    return chars.slice(1).toUpperCase();
  });
}
