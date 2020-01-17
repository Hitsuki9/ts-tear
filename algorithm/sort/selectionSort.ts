/**
 * 选择排序 O(n^2)
 * @param arr 数组
 */
export default function selectionSort(arr: number[]) {
  const len = arr.length;
  // let loopCount = 0;
  // let changeCount = 0;
  for (let i = 0; i < len; i++) {
    let minIdx = i;
    for (let j = i + 1; j < len; j++) {
      // loopCount++;
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      // changeCount++;
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  // console.log(`循环次数：${loopCount}\n交换次数：${changeCount}`);
}
