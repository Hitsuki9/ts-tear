import gcd from './gcd';

test('gcd function is working without bugs', () => {
  expect(gcd(18, 30)).toBe(6);
  expect(gcd(56, 49)).toBe(7);
});
