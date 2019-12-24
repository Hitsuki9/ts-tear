interface Node {
  parent: Record<string | number | symbol, any>;
  key: string | undefined;
  data: any;
}

/**
 * 深拷贝 循环实现
 * @param obj 只支持数组和对象
 */
export default function deepClone<
  T extends Record<string | number | symbol, any>
>(obj: T): T {
  let root = {};
  if (Array.isArray(obj)) {
    root = [];
  }
  const loopList: Node[] = [
    {
      parent: root,
      key: undefined,
      data: obj
    }
  ];
  while (loopList.length) {
    const node = loopList.pop();
    const { parent, key, data } = node!;
    let res = parent;
    if (typeof key !== 'undefined') {
      res = parent[key] = Array.isArray(data) ? [] : {};
    }
    if (Array.isArray(data)) {
      for (const [index, item] of data.entries()) {
        // 解决一层循环引用问题
        if (item === data) {
          res[index] = res;
        } else if (
          Array.isArray(item) ||
          (typeof item === 'object' && item !== null)
        ) {
          loopList.push({
            parent: res,
            key: index.toString(),
            data: item
          });
        } else {
          res[index] = item;
        }
      }
    } else if (typeof data === 'object' && data !== null) {
      for (const [key, value] of Object.entries(data)) {
        // 解决一层循环引用问题
        if (value === data) {
          res[key] = res;
        } else if (
          Array.isArray(value) ||
          (typeof value === 'object' && value !== null)
        ) {
          loopList.push({
            parent: res,
            key,
            data: value
          });
        } else {
          res[key] = value;
        }
      }
    }
  }
  return root as T;
}
