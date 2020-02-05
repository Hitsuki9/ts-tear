import leftPad from './leftPad';

test('leftPad function is working without bugs', () => {
  expect(leftPad('hello', 10, 'a')).toBe('aaaaahello');
});
