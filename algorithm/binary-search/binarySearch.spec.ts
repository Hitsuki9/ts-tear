import binarySearch from './binarySearch';

const arr: number[] = [];
for (let i = 0; i < 1000; i++) {
  arr[i] = i;
}
arr[1000] = 99999;
arr[999] = 2333;

test('binarySearch function is working without bugs', () => {
  expect(binarySearch(arr, 574)).toBe(574);
  expect(binarySearch(arr, 234)).toBe(234);
  expect(binarySearch(arr, 1001)).toBe(-1);
  expect(binarySearch(arr, 99999)).toBe(1000);
  expect(binarySearch(arr, 2333)).toBe(999);
});
