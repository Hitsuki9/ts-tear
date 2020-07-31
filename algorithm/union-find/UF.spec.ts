import UF from './UF';

const uf = new UF(1000);

test('union find is working without bugs', () => {
  expect(uf.count).toBe(1000);
  expect(uf.union(2, 20).count).toBe(999);
  expect(uf.union(20, 88).count).toBe(998);
  expect(uf.union(88, 2).count).toBe(998);
});
