/**
 * 希尔排序
 * @param arr 数组
 */
export default function shellSort(arr: number[]) {
  const len = arr.length;
  let gap = len >> 1;
  while (gap) {
    for (let i = gap; i < len; i++) {
      let j = i;
      while (j - gap >= 0 && arr[j - gap] > arr[j]) {
        [arr[j - gap], arr[j]] = [arr[j], arr[j - gap]];
        j -= gap;
      }
    }
    gap >>= 1;
  }
}
