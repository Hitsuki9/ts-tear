/**
 * 缓存函数
 * @param fn 需要缓存的函数
 */
export default function memorize<T extends (value: string) => any>(fn: T) {
  const cache = new Map();
  return function memorizedFn(value: string) {
    return cache.has(value)
      ? cache.get(value)
      : cache.set(value, fn(value)) && cache.get(value);
  } as T;
}
