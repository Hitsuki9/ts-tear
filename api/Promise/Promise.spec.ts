import _Promise from './Promise';

test('Promise is working without bugs', (done) => {
  expect(
    new _Promise((resolve) => {
      resolve(1);
    })
      .then()
      .catch()
      .then((res) => (res as number) + 1).data
  ).toBe(undefined);
  expect(
    new _Promise((resolve, reject) => {
      reject(1);
    })
      .then()
      .catch((err) => {
        expect(err === 1).toBeTruthy();
      }).status
  ).toBe('pending');
  const promise1 = new _Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
  const promise2 = promise1.then((res) => (res as number) + 1);
  expect(promise1.data).toBe(undefined);
  setTimeout(() => {
    expect(promise1.data).toBe(1);
    expect(promise2.data).toBe(2);
    done();
  }, 1005);
});
