/**
 * 堆排序 O(nlogn)
 * @param arr 数组
 */
export default function heapSort(arr: number[]) {
  createHeap(arr);
  let temp: number;
  // 交换堆顶元素与最后一个元素，然后将剩下的元素重新调整为大顶堆
  for (let i = arr.length - 1; i > 0; i--) {
    // [arr[i], arr[0]] = [arr[0], arr[i]]; bad performance
    temp = arr[i];
    arr[i] = arr[0];
    arr[0] = temp;
    adjust(arr, 0, i);
  }
}

// 从第一个非叶子节点开始构建大顶堆
function createHeap(arr: number[]) {
  const len = arr.length;
  const start = Math.floor(len / 2) - 1;
  for (let i = start; i >= 0; i--) {
    adjust(arr, i, len);
  }
}

function adjust(arr: number[], target: number, len: number) {
  let temp: number;
  for (let i = 2 * target + 1; i < len; i = 2 * i + 1) {
    if (i + 1 < len && arr[i + 1] > arr[i]) {
      i += 1;
    }
    if (arr[target] < arr[i]) {
      // [arr[target], arr[i]] = [arr[i], arr[target]]; bad performance
      temp = arr[target];
      arr[target] = arr[i];
      arr[i] = temp;
      target = i;
    } else {
      break;
    }
  }
}
