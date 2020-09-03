/**
 * 冒泡排序 O(n^2)
 * @param arr 数组
 */
export default function bubbleSort(arr: number[]) {
  const len = arr.length;
  let temp: number;
  // let loopCount = 0;
  // let changeCount = 0;
  for (let i = 0; i < len; i++) {
    // 优化点：如果一次循环中没有发生冒泡，则说明已经排序完成，可直接停止循环
    let complete = true;
    for (let j = 0; j < len - 1 - i; j++) {
      // loopCount++;
      if (arr[j] > arr[j + 1]) {
        // changeCount++;
        // [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; bad performance
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        complete = false;
      }
    }
    if (complete) break;
  }
  // console.log(`循环次数：${loopCount}\n交换次数：${changeCount}`);
}
