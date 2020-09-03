/**
 * 希尔排序
 * @param arr 数组
 */
export default function shellSort(arr: number[]) {
  const len = arr.length;
  let gap = len >> 1;
  let temp: number;
  while (gap) {
    for (let i = gap; i < len; i++) {
      let j = i;
      while (j - gap >= 0 && arr[j - gap] > arr[j]) {
        // [arr[j - gap], arr[j]] = [arr[j], arr[j - gap]]; bad performance
        temp = arr[j - gap];
        arr[j - gap] = arr[j];
        arr[j] = temp;
        j -= gap;
      }
    }
    gap >>= 1;
  }
}
