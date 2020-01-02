# 缓存函数

对于需要大量计算的函数，如果相同的入参可以得到一致的返回值，则可以将结果缓存起来，下次再以同样的入参调用该函数时即可直接从缓存中获取结果而不用重复计算。

## Vue 源码版

```ts
function cached<T extends (str: string) => any>(fn: T) {
  const cache = Object.create(null);
  return function cachedFn(str: string) {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  } as T;
}
```
