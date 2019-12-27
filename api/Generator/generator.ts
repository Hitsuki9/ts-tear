/**
 * 迭代器生成器
 * @param list 数组
 */
export default function generator(list: any[]) {
  let idx = 0,
    len = list.length;
  return {
    next() {
      const done = idx >= len - 1;
      const value = idx >= len ? undefined : list[idx++];
      return {
        done,
        value
      };
    }
  };
}
