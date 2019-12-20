import debounce from './debounce';

const delay = 500;
const cb = debounce(fn, delay);
let i = 0;
function fn(a: number, b?: number) {
  a && (i += a);
  b && (i *= b);
}

test('debounce function is working with bugs', (done) => {
  for (let i = 0; i < 100; i++) {
    cb(5);
  }
  setTimeout(() => {
    expect(i).toBe(5);
    cb(7, 2);
    setTimeout(() => {
      expect(i).toBe(24);
      done();
    }, delay);
  }, delay);
});
