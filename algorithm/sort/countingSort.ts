/**
 * 计数排序
 * @param arr 数组
 */
export default function countingSort(arr: number[]) {
  let max = -Infinity,
    min = Infinity;
  for (const item of arr) {
    if (item > max) max = item;
    if (item < min) min = item;
  }
  const temp = new Array(max - min + 1).fill(0);
  for (const item of arr) temp[item - min]++;
  let j = 0;
  for (let i = 0; i < arr.length; i++) {
    while (!temp[j]) j++;
    arr[i] = j + min;
    temp[j]--;
  }
}
