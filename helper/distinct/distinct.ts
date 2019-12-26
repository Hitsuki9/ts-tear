/**
 * 数组去重 引用类型进行浅比较
 * @param arr 数组
 */
export default function distinct(arr: any[]) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}
