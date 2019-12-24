# 深拷贝

`JSON.parse(JSON.stringify(obj))` 可解决大部分需要深拷贝的场景。

局限性：

- 会忽略 `undefined`
- 会忽略 `Symbol`
- 不能序列化函数
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
