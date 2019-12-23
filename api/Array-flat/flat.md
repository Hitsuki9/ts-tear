# Array.prototype.flat

`flat` 函数要做的就是**在数组中找到是数组类型的元素，然后将他们展开**。

判断元素是数组的方案：

- `instanceof`
- `constructor`
- `Array.isArray`
- `Object.prototype.toString`

```ts
const arr = [];
arr instanceof Array; // true
arr.constructor; // Array
Array.isArray(arr); // true
Object.prototype.toString.call(arr); // '[Object Array]'
```

> `constructor` 可以被重写，`instanceof` 也可以通过 `static [Symbol.hasInstance]()` 来改变行为。

## concat + 递归

跳过空位

```ts
function flat(arr: any[], depth: number = 1) {
  let res: any[] = [];
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      if (depth > 0) {
        res = res.concat(flat(item, depth - 1)); // 递归
      } else {
        res.push(item.slice());
      }
    } else {
      res.push(item);
    }
  });
  return res;
}
```

## 栈

不能指定深度，空位转为 `undefined`

```ts
function flat(arr: any[]) {
  const res = [];
  const stack = ([] as any[]).concat(arr);
  // 栈不为空则循环遍历
  while (stack.length) {
    const end = stack.pop();
    if (Array.isArray(end)) {
      // 若栈顶是数组则展开一层，并再次入栈
      stack.push(...end);
    } else {
      res.unshift(end);
    }
  }
  return res;
}
```

## Generator

空位转为 `undefined`

```ts
function* flat(arr: any[], depth: number = 1) {
  for (const item of arr) {
    if (Array.isArray(item)) {
      if (depth > 0) {
        yield* flat(item, depth - 1);
      } else {
        yield item.slice();
      }
    } else {
      yield item;
    }
  }
}

const arr = [1, [2, [3], 4], 5];
[...flat(arr, Infinity)]; // [1, 2, 3, 4, 5]
```

> `forEach()`，`filter()`，`reduce()`，`every()` 和 `some()` 会跳过空位。
