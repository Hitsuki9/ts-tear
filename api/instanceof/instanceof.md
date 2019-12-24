# instanceof

`instanceof` 可以通过 `static [Symbol.hasInstance]()` 来改变行为，所以 `instanceof` 也不是 100% 可信的。

```ts
class PrimitiveString {
  static [Symbol.hasInstance](x: any) {
    return typeof x === 'string';
  }
}

'hello world' instanceof PrimitiveString; // true
```

## 扩展

对象在转换类型的时候，会调用内置的 `[[ToPrimitive]]` 函数，可以通过重写 `[Symbol.toPrimitive]()` 方法来改变转换逻辑，该方法在对象转换为原始类型时调用优先级最高。

```ts
let a = {
  valueOf() {
    return 0;
  },
  toString() {
    return '1';
  },
  [Symbol.toPrimitive]() {
    return 2;
  }
};

1 + a; // 3
```
