import throttle from './throttle';

const delay = 50;
const cb = throttle(fn, delay);
let i = 0;
function fn(a: number, b?: number) {
  a && (i += a);
  b && (i *= b);
}

test('throttle function is working with bugs', (done) => {
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      cb(1);
    }, (delay / 2) * (i + 1));
  }
  setTimeout(() => {
    expect(i).toBeLessThanOrEqual(5);
    done();
  }, delay * 10);
});
