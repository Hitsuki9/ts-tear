/**
 * 归并排序 O(nlogn)
 * @param arr 数组
 * @param left 数组头索引
 * @param right 数组尾索引
 * @param temp 临时数组
 */
export default function mergeSort(
  arr: number[],
  left: number,
  right: number,
  temp: number[] = []
) {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);
    mergeSort(arr, left, mid, temp);
    mergeSort(arr, mid + 1, right, temp);
    merge(arr, left, right, mid, temp);
  }
}

function merge(
  arr: number[],
  left: number,
  right: number,
  mid: number,
  temp: number[]
) {
  let leftIdx = left,
    rightIdx = mid + 1,
    tempIdx = 0;
  while (leftIdx <= mid && rightIdx <= right) {
    if (arr[leftIdx] <= arr[rightIdx]) {
      temp[tempIdx++] = arr[leftIdx++];
    } else {
      temp[tempIdx++] = arr[rightIdx++];
    }
  }
  while (leftIdx <= mid) {
    temp[tempIdx++] = arr[leftIdx++];
  }
  while (rightIdx <= right) {
    temp[tempIdx++] = arr[rightIdx++];
  }
  for (let i = left; i <= right; i++) {
    arr[i] = temp[i - left];
  }
}
