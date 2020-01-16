/**
 * 插入排序 O(n^2)
 * @param arr 数组
 */
export default function insertSort(arr: number[]) {
  const len = arr.length;
  let loopCount = 0;
  let changeCount = 0;
  for (let i = 1; i < len; i++) {
    let target = i;
    for (let j = i - 1; j >= 0; j--) {
      loopCount++;
      if (arr[j] > arr[target]) {
        changeCount++;
        [arr[j], arr[target]] = [arr[target], arr[j]];
        target = j;
      } else {
        break;
      }
    }
  }
  console.log('循环次数', loopCount);
  console.log('交换次数', changeCount);
}
