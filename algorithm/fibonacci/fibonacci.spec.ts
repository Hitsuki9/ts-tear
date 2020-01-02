import fibonacci from './fibonacci';

const handler = fibonacci();

test('fibonacci function is working without bugs', () => {
  expect(handler(31)).toBe(1346269);
  expect(handler(39)).toBe(63245986);
  expect(handler(41)).toBe(165580141);
  expect(handler(1476)).toBe(1.3069892237633987e308);
  expect(handler(1477)).toBe(Infinity);
});
