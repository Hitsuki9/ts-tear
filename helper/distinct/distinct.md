# 数组去重

## Set

```ts
function distinct(arr: any[]) {
  return [...new Set(arr)];
}
```

## Map

```ts
function distinct(arr: any[]) {
  const map = new Map();
  return arr.filter((item) =>
    map.has(item) ? false : map === map.set(item, true)
  );
}
```

> 也可使用 `Object` 实现，但需注意**对象的键值只能是字符串**。

## 对比

- `indexOf` 底层使用 `===`，所以查找不到 `NaN` 元素
- `Set`，`Map` 和 `Object` 可去重 `NaN`
