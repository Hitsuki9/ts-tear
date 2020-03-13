/**
 * 摩尔投票算法
 * @param arr
 * 条件：重复出现的元素必须超过数组长度的一半
 */
export default function majorityElement(arr: number[]) {
  let count = 0,
    res;
  for (const item of arr) {
    if (count === 0) res = item;
    count += item === res ? 1 : -1;
  }
  return res;
}
