/**
 * 希尔排序
 * @param arr 数组
 */
export default function shellSort(arr: number[]) {
  const len = arr.length;
  let gap = len >> 1;
  while (gap) {
    for (let i = gap; i < len; i++) {
      while (i - gap >= 0 && arr[i - gap] > arr[i]) {
        [arr[i - gap], arr[i]] = [arr[i], arr[i - gap]];
        i -= gap;
      }
    }
    gap >>= 1;
  }
}
