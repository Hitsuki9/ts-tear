export default class Promise<T = unknown> {
  status: 'pending' | 'fulfilled' | 'rejected' = 'pending'; // Promise 当前的状态
  data = undefined as T | undefined; // Promise 的值
  onResolvedCallback: ((value?: T) => void)[] = []; // Promise resolve 时的回调函数集合
  onRejectedCallback: ((reason?: any) => void)[] = []; // Promise reject 时的回调函数集合
  constructor(
    executor: (
      resolve: (value?: T) => void,
      reject: (reason?: any) => void
    ) => void
  ) {
    const self = this;
    function resolve(value?: T) {
      // 为保证执行顺序，异步调用
      setTimeout(() => {
        if (self.status === 'pending') {
          self.status = 'fulfilled';
          self.data = value;
          for (const callback of self.onResolvedCallback) {
            callback(value);
          }
        }
      }, 0);
    }
    function reject(reason?: any) {
      // 为保证执行顺序，异步调用
      setTimeout(() => {
        if (self.status === 'pending') {
          self.status = 'rejected';
          self.data = reason;
          for (const callback of self.onRejectedCallback) {
            callback(reason);
          }
        }
      }, 0);
    }
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  then<U = void, O = never>(
    onfulfilled?: (value: T) => U,
    onrejected?: (reason: any) => O
  ) {
    // 兼容遵守 Promise/A+ 规范的多种 Promise 实现
    function resolutionProcedure(
      promise2: Promise,
      x: any,
      resolve: (value?: T) => void,
      reject: (reason?: any) => void
    ) {
      // promise2 与 x 为同一个对象会引起循环引用
      if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise!'));
      }
      // 自己的 Promise 实现
      if (x instanceof Promise) {
        if (x.status === 'pending') {
          x.then((value) => {
            resolutionProcedure(promise2, value, resolve, reject);
          }, reject);
        } else {
          x.then(resolve, reject);
        }
        return;
      }
      // 其它的 Promise 实现
      if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        let then = x.then;
        let called = false; // 是否已经调用过的标记
        try {
          if (typeof then === 'function') {
            then.call(
              x,
              (value: any) => {
                if (called) return;
                called = true;
                resolutionProcedure(promise2, value, resolve, reject);
              },
              (reason: any) => {
                if (called) return;
                called = true;
                reject(reason);
              }
            );
          } else {
            resolve(x);
          }
        } catch (err) {
          if (called) return;
          called = true;
          reject(err);
        }
      } else {
        resolve(x);
      }
    }
    let promise2: Promise;
    // Promise/A+ 规范规定如果 then 的参数不是 function，则需要忽略它
    // 并且值可以穿透下去
    onfulfilled =
      typeof onfulfilled === 'function'
        ? onfulfilled
        : function(value) {
            return (value as unknown) as U;
          };
    onrejected =
      typeof onrejected === 'function'
        ? onrejected
        : function(reason) {
            throw reason;
          };
    if (this.status === 'fulfilled') {
      return (promise2 = new Promise((resolve, reject) => {
        // 为保证执行顺序，异步调用
        setTimeout(() => {
          try {
            if (typeof onfulfilled === 'function') {
              const x = onfulfilled(this.data as T);
              // 如果 onfulfilled 的返回值是一个 Promise，则直接取它的结果
              resolutionProcedure(promise2, x, resolve, reject);
            }
          } catch (err) {
            reject(err);
          }
        }, 0);
      }));
    }
    if (this.status === 'rejected') {
      return (promise2 = new Promise((resolve, reject) => {
        // 为保证执行顺序，异步调用
        setTimeout(() => {
          try {
            if (typeof onrejected === 'function') {
              const x = onrejected(this.data);
              // 如果 onrejected 的返回值是一个 Promise，则直接取它的结果
              resolutionProcedure(promise2, x, resolve, reject);
            }
          } catch (err) {
            reject(err);
          }
        }, 0);
      }));
    }
    // pending
    return (promise2 = new Promise((resolve, reject) => {
      this.onResolvedCallback.push((value?: T) => {
        try {
          if (typeof onfulfilled === 'function') {
            const x = onfulfilled(value as T);
            resolutionProcedure(promise2, x, resolve, reject);
          }
        } catch (e) {
          reject(e);
        }
      });
      this.onRejectedCallback.push((reason?: any) => {
        try {
          if (typeof onrejected === 'function') {
            const x = onrejected(reason);
            resolutionProcedure(promise2, x, resolve, reject);
          }
        } catch (e) {
          reject(e);
        }
      });
    }));
  }
  catch<V = never>(onrejected?: (reason: any) => V) {
    return this.then(undefined, onrejected);
  }
}
