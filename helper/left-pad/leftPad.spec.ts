import leftPad from './leftPad';

const count = 500;
function lowLeftPad(str: string, len: number, ch = ' ') {
  const length = len - str.length;
  let i = 0;
  while (i++ < length) {
    str = ch + str;
  }
  return str;
}

test('leftPad function is working without bugs', () => {
  expect(leftPad('hello', 10, 'a')).toBe('aaaaahello');
  expect(leftPad('', 10)).toBe('          ');
  console.time('leftPad');
  const res1 = leftPad('world', count, '-');
  console.timeEnd('leftPad');
  console.time('lowLeftPad');
  const res2 = lowLeftPad('world', count, '-');
  console.timeEnd('lowLeftPad');
  expect(res1).toBe(res2);
});
