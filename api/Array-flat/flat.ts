/**
 * flat
 * @param arr 数组
 * @param depth 指定要提取嵌套数组的结构深度，默认为 1
 */
export default function flat(arr: any[], depth: number = 1): any[] {
  return depth > 0
    ? arr.reduce(
        (pre: any[], cur) =>
          pre.concat(Array.isArray(cur) ? flat(cur, depth - 1) : cur),
        []
      )
    : arr.slice();
}
