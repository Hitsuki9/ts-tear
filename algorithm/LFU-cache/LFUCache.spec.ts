import LFUCache from './LFUCache';

test('LFUCache function is working without bugs', () => {
  const cache = new LFUCache(2);
  cache.put('1', 1);
  cache.put('2', 2);
  expect(cache.get('1')).toBe(1); // 返回 1
  cache.put('3', 3); // 去除 key 2
  expect(cache.get('2')).toBe(-1); // 返回 -1 (未找到key 2)
  cache.get('3'); // 返回 3
  cache.put('4', 4); // 去除 key 1
  expect(cache.get('1')).toBe(-1); // 返回 -1 (未找到 key 1)
  expect(cache.get('3')).toBe(3); // 返回 3
  expect(cache.get('4')).toBe(4); // 返回 4
});
