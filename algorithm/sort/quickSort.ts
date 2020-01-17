/**
 * 快速排序 O(nlogn)
 * @param arr 数组
 * @param start 子数组头索引
 * @param end 子数组尾索引
 */
export default function quickSort(arr: number[], start: number, end: number) {
  if (end - start < 1) return;
  const base = arr[start];
  let l = start,
    r = end;
  while (r > l) {
    while (r > l && arr[r] >= base) {
      r--;
    }
    arr[l] = arr[r];
    while (r > l && arr[l] < base) {
      l++;
    }
    arr[r] = arr[l];
  }
  arr[l] = base;
  quickSort(arr, start, l - 1);
  quickSort(arr, l + 1, end);
}
