# 深拷贝

`JSON.parse(JSON.stringify(obj))` 可解决大部分需要深拷贝的场景。

局限性：

- 会忽略 `undefined`
- 会忽略 `Symbol`
- 会忽略函数
- 会将 `Set`，`Map`，`WeakSet`，`WeakMap` 转换为空对象 `{}`
- 不能解决循环引用的问题
- 数据结构的深度过大时会导致栈溢出（内部可能是递归实现）

```ts
const a = {
  age: undefined,
  sex: Symbol(),
  jobs: function() {},
  name: 'Hitsuki9'
};

const b = JSON.parse(JSON.stringify(a));
console.log(b); // {name: "Hitsuki9"}
```

```ts
const a = {
  a: {}
};
a.a = a;

JSON.parse(JSON.stringify(a));
// Uncaught TypeError: Converting circular structure to JSON
```

`MessageChannel` 可以处理 `undefined`，`Set`，`Map`，`WeakSet`，`WeakMap` 和解决循环引用问题。

```ts
function deepClone<T extends Record<string | number | symbol, any>>(
  obj: T
): Promise<T> {
  return new Promise((resolve) => {
    const { port1, port2 } = new MessageChannel();
    port2.onmessage = (ev) => resolve(ev.data);
    port1.postMessage(obj);
  });
}

const obj = {
  a: 1,
  b: {
    c: 2,
    d: {},
    e: undefined
  }
};

obj.b.d = obj.b;

// 该方法是异步的
const test = async () => {
  const clone = await deepClone(obj);
  return clone;
};
```

## 递归

层级过深时会引起栈溢出，难以通过尾递归进行优化，可改用循环实现解决此问题。

```ts
function deepClone<T extends Record<string | number | symbol, any>>(obj: T): T {
  let target: Record<string | number | symbol, any> = {};
  if (Array.isArray(obj)) {
    target = [];
    for (const [index, item] of obj.entries()) {
      if (typeof item === 'object' && item !== null) {
        target[index] = deepClone(item);
      } else {
        target[index] = item;
      }
    }
    return target;
  }
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      target[key] = deepClone(value);
    } else {
      target[key] = value;
    }
  }
  return target;
}
```

## 解决循环引用问题

可在循环实现的基础上维护一个 `Map`，用于缓存已经拷贝过的对象的源和目标，每次拷贝对象前都先检查一遍该 `Map`。

在嵌套对象数量过多时会出现性能问题。

## 性能对比

- 相互之间的差异与对象深度有关，深度越浅差异越小
- 递归实现与循环实现的差异不大
- 循环实现 ≈ 递归实现 > 循环 + `Map` > `JSON`
