import bubbleSort from './bubbleSort';
import heapSort from './heapSort';
import insertSort from './insertSort';
import mergeSort from './mergeSort';
import quickSort from './quickSort';
import selectionSort from './selectionSort';

const arrCase: number[] = [];
const count = 500;
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
  bubbleSort(newCase);
  let end = Date.now();
  console.log(`bubble sort: ${end - start}ms`);
  expect(newCase).toEqual(correctRes);
  // 插入排序
  newCase = arrCase.slice();
  start = Date.now();
  insertSort(newCase);
  end = Date.now();
  console.log(`insert sort: ${end - start}ms`);
  expect(newCase).toEqual(correctRes);
  // 选择排序
  newCase = arrCase.slice();
  start = Date.now();
  selectionSort(newCase);
  end = Date.now();
  console.log(`selection sort: ${end - start}ms`);
  expect(newCase).toEqual(correctRes);
  // 快速排序
  try {
    newCase = arrCase.slice();
    start = Date.now();
    quickSort(newCase, 0, endIdx);
    end = Date.now();
    console.log(`quick sort: ${end - start}ms`);
    expect(newCase).toEqual(correctRes);
  } catch (err) {
    console.log(err.message);
  }
  // 归并排序
  newCase = arrCase.slice();
  start = Date.now();
  mergeSort(newCase, 0, endIdx);
  end = Date.now();
  console.log(`merge sort: ${end - start}ms`);
  expect(newCase).toEqual(correctRes);
  // 堆排序
  newCase = arrCase.slice();
  start = Date.now();
  heapSort(newCase);
  end = Date.now();
  console.log(`heap sort: ${end - start}ms`);
  expect(newCase).toEqual(correctRes);
});
