import topK from './topK';

test('topK function is working without bugs', () => {
  expect(topK([], 1)).toBe(null);
  expect(topK([3, 3, 3], 2)).toBe(3);
  expect(topK([3, 4, 6, 2, 4, 6], 4)).toBe(4);
  expect(topK([2, 1, 6, 2, 9, 8, 4, 6], 5)).toBe(6);
});
