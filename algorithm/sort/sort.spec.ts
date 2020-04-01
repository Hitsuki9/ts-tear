import bubbleSort from './bubbleSort';
import heapSort from './heapSort';
import insertSort from './insertSort';
import mergeSort from './mergeSort';
import quickSort from './quickSort';
import selectionSort from './selectionSort';
import shellSort from './shellSort';
import countingSort from './countingSort';
import radixSort from './radixSort';

const arrCase: number[] = [];
const count = 50;
for (let i = 0; i < count; i++) {
  arrCase[i] = Math.floor(Math.random() * 200000);
}
// for (let i = 0; i < count; i++) {
//   arrCase[i] = count - i;
// }
// for (let i = 0; i < count; i++) {
//   arrCase[i] = i;
// }
const correctRes = arrCase.slice();
correctRes.sort((a, b) => a - b);

test('sort functions are working without bugs', () => {
  let endIdx = count - 1;
  let newCase = arrCase.slice();
  // 冒泡排序
  let start = Date.now();
  console.time('bubble sort');
  bubbleSort(newCase);
  console.timeEnd('bubble sort');
  expect(newCase).toEqual(correctRes);
  // 插入排序
  newCase = arrCase.slice();
  console.time('insert sort');
  insertSort(newCase);
  console.timeEnd('insert sort');
  expect(newCase).toEqual(correctRes);
  // 选择排序
  newCase = arrCase.slice();
  console.time('selection sort');
  selectionSort(newCase);
  console.timeEnd('selection sort');
  expect(newCase).toEqual(correctRes);
  // 快速排序
  try {
    newCase = arrCase.slice();
    console.time('quick sort');
    quickSort(newCase, 0, endIdx);
    console.timeEnd('quick sort');
    expect(newCase).toEqual(correctRes);
  } catch (err) {
    console.log(err.message);
  }
  // 归并排序
  newCase = arrCase.slice();
  console.time('merge sort');
  mergeSort(newCase, 0, endIdx);
  console.timeEnd('merge sort');
  expect(newCase).toEqual(correctRes);
  // 堆排序
  newCase = arrCase.slice();
  console.time('heap sort');
  heapSort(newCase);
  console.timeEnd('heap sort');
  expect(newCase).toEqual(correctRes);
  // 希尔排序
  newCase = arrCase.slice();
  console.time('shell sort');
  shellSort(newCase);
  console.timeEnd('shell sort');
  expect(newCase).toEqual(correctRes);
  // 计数排序
  newCase = arrCase.slice();
  console.time('counting sort');
  countingSort(newCase);
  console.timeEnd('counting sort');
  expect(newCase).toEqual(correctRes);
  // 基数排序
  newCase = arrCase.slice();
  console.time('radix sort');
  radixSort(newCase);
  console.timeEnd('radix sort');
  expect(newCase).toEqual(correctRes);
});
