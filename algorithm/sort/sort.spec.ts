import bubbleSort from './bubbleSort';
import heapSort from './heapSort';
import insertSort from './insertSort';
import mergeSort from './mergeSort';
import quickSort from './quickSort';
import selectionSort from './selectionSort';

const arrCase: number[] = [];
for (let i = 0; i < 50000; i++) {
  arrCase[i] = Math.floor(Math.random() * 200000);
}
// for (let i = 0; i < 50000; i++) {
//   arrCase[i] = 50000 - i;
// }
// for (let i = 0; i < 50000; i++) {
//   arrCase[i] = i;
// }
const correctRes = arrCase.slice();
correctRes.sort((a, b) => a - b);

test('sort functions are working without bugs', () => {
  // 冒泡排序
  let newCase = arrCase.slice();
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
});
