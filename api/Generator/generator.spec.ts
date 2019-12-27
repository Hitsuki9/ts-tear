import generator from './generator';

const list = [1, 2, 3, 4, 5];
const iterator = generator(list);

test('generator function is working without bugs', () => {
  expect(iterator.next()).toEqual({ done: false, value: 1 });
  expect(iterator.next()).toEqual({ done: false, value: 2 });
  expect(iterator.next()).toEqual({ done: false, value: 3 });
  expect(iterator.next()).toEqual({ done: false, value: 4 });
  expect(iterator.next()).toEqual({ done: true, value: 5 });
  expect(iterator.next()).toEqual({ done: true, value: undefined });
  expect(iterator.next()).toEqual({ done: true, value: undefined });
});
