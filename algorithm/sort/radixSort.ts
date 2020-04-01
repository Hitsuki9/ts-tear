/**
 * 基数排序
 * @param arr 数组
 */
export default function radixSort(arr: number[]) {
  let max = -Infinity;
  for (const item of arr) {
    if (item > max) max = item;
  }
  const maxLen = max.toString().length,
    buckets: number[][] = [];
  for (let i = 0; i < 10; i++) {
    buckets.push([]);
  }
  let mod = 10,
    div = 1;
  for (let i = 0; i < maxLen; i++) {
    for (const item of arr) {
      buckets[Math.floor((item % mod) / div)].push(item);
    }
    let idx = 0;
    for (let j = 0; j < 10; j++) {
      for (const item of buckets[j]) {
        arr[idx++] = item;
      }
      buckets[j] = [];
    }
    mod *= 10;
    div *= 10;
  }
}
