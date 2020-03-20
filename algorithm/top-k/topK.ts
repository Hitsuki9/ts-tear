/**
 * 数组中的第 K 个最大元素
 * @param arr 数组
 * @param k
 * 快排思想
 */
export default function topK(arr: number[], k: number) {
  if (k === 0 || arr.length === 0) {
    return null;
  }
  function quickSearch(left: number, right: number): number {
    const base = arr[left];
    let l = left,
      r = right;
    while (l < r) {
      while (l < r && arr[r] >= base) r--;
      arr[l] = arr[r];
      while (l < r && arr[l] < base) l++;
      arr[r] = arr[l];
    }
    arr[l] = base;
    if (l === k - 1) return arr[l];
    return l > k - 1 ? quickSearch(left, l - 1) : quickSearch(l + 1, right);
  }
  return quickSearch(0, arr.length - 1);
}
