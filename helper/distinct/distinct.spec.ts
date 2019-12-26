import distinct from './distinct';

const arr: any[] = [1, 2, 3, 2, 4, '6', 7, 3, '4', 2, 1, '6'];
const obj = {};

test('distinct function is working without bugs', () => {
  expect(distinct(arr)).toEqual([1, 2, 3, 4, '6', 7, '4']);
  arr.push(obj, {}, {}, obj);
  expect(distinct(arr)).toEqual([1, 2, 3, 4, '6', 7, '4', {}, {}, {}]);
  expect(distinct(arr)[7]).toBe(obj);
});
