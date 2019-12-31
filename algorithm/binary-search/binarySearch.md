# 二分查找

**分析二分查找的一个技巧是：不要出现 else，而是把所有情况用 else if 写清楚，这样可以清楚地展现所有细节。**

`while` 循环的条件：

1. `left = 0, right = array.length` 时，`while (left < right)`，相当于前闭后开区间 `[left, right)`，终止条件是 `left === right`，写成区间的形式为 `[right, right)`，这时候搜索区间为空，所以循环结束后可直接确定没有匹配的元素。
2. `left = 0, right = array.length - 1` 时，`while (left <= right)`， 相当于闭区间 `[left, right]`，终止条件是 `left === right + 1`，写成区间的形式为 `[right + 1, right]`，这时候搜索区间为空，所以循环结束后可直接确定没有匹配的元素。

`left` 和 `right` 的新值：

1. 当采用前闭后开区间时，新区间也应为前闭后开区间，且 `mid` 位置已经检测过，所以新区间应为 `[left, mid)` 或 `[mid + 1, right)`，即 `left` 的新值为 `mid + 1`，`right` 的新值为 `mid`。
2. 当采用闭区间时，新区间也应为闭区间，且 `mid` 位置已经检测过，所以新区间应为 `[left, mid - 1]` 或 `[mid + 1, right]`，即 `left` 的新值为 `mid + 1`，`right` 的新值为 `mid - 1`。

## 寻找左侧边界的二分查找

```ts
function leftBoundary(nums: number[], target: number) {
  if (nums.length === 0) return -1;
  let left = 0;
  let right = nums.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      right = mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid;
    }
  }
  // target 比所有数都大
  if (left === nums.length) return -1;
  return nums[left] === target ? left : -1;
}
```

## 寻找右侧边界的二分查找

```ts
function rightBoundary(nums: number[], target: number) {
  if (nums.length === 0) return -1;
  let left = 0;
  let right = nums.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      left = mid + 1; // mid = left - 1
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid;
    }
  }
  if (left === 0) return -1;
  return nums[left - 1] === target ? left - 1 : -1;
}
```
