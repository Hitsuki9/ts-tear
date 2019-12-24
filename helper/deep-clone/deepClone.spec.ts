import deepClone from './deepClone';

const obj = {
  a: {
    b: [
      1,
      2,
      {
        c: [
          3,
          {
            d: 4,
            e: {
              f: 5,
              g: [],
              h: {
                i: {}
              }
            }
          }
        ]
      }
    ]
  }
};

test('deepClone function is working without bugs', () => {
  const deepCopy = deepClone(obj);
  const shallowCopy = obj;
  expect(
    (shallowCopy.a.b[2] as any).c[1].e.h.i === (obj.a.b[2] as any).c[1].e.h.i
  ).toBeTruthy();
  expect(
    (deepCopy.a.b[2] as any).c[1].e.h.i === (obj.a.b[2] as any).c[1].e.h.i
  ).toBeFalsy();
});
