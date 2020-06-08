# 仅实现异步链式调用的简化版

```js
function Promise(excutor) {
  var self = this;
  self.onResolvedCallback = []; // resolve 时的回调函数集
  function resolve(value) {
    self.data = value;
    self.onResolvedCallback.forEach((callback) => callback(value));
  }
  excutor(resolve.bind(self));
}
Promise.prototype.then = function (onResolved) {
  var self = this;
  // 返回一个新的 promise
  return new Promise((resolve) => {
    self.onResolvedCallback.push(function () {
      var result = onResolved(self.data);
      if (result instanceof Promise) {
        // resolve 的权力被交给了 user promise
        result.then(resolve);
      } else {
        resolve(result);
      }
    });
  });
};
```

# 清晰实现

```js
// Promise/A+ 规定的三种状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  // 构造方法接收一个回调
  constructor(executor) {
    this._status = PENDING; // Promise 状态
    this._value = undefined; // 储存 then 回调 return 的值
    this._resolveQueue = []; // 成功队列, resolve 时触发
    this._rejectQueue = []; // 失败队列, reject 时触发

    // 由于 resolve/reject 是在 executor 内部被调用, 因此需要使用箭头函数固定 this 指向, 否则找不到 this._resolveQueue
    let _resolve = (val) => {
      // 把 resolve 执行回调的操作封装成一个函数, 放进 setTimeout 里, 以兼容 executor 是同步代码的情况
      const run = () => {
        if (this._status !== PENDING) return; // 对应规范中的"状态只能由 pending 到 fulfilled 或 rejected"
        this._status = FULFILLED; // 变更状态
        this._value = val; // 储存当前 value

        // 这里之所以使用一个队列来储存回调, 是为了实现规范要求的 "then 方法可以被同一个 promise 调用多次"
        // 如果使用一个变量而非队列来储存回调, 那么即使多次 p1.then() 也只会执行一次回调
        while (this._resolveQueue.length) {
          const callback = this._resolveQueue.shift();
          callback(val);
        }
      };
      setTimeout(run);
    };
    // 实现同 resolve
    let _reject = (val) => {
      const run = () => {
        if (this._status !== PENDING) return; // 对应规范中的"状态只能由 pending 到 fulfilled 或 rejected"
        this._status = REJECTED; // 变更状态
        this._value = val; // 储存当前 value
        while (this._rejectQueue.length) {
          const callback = this._rejectQueue.shift();
          callback(val);
        }
      };
      setTimeout(run);
    };
    // new Promise() 时立即执行 executor, 并传入 resolve 和 reject
    executor(_resolve, _reject);
  }

  // then 方法, 接收一个成功的回调和一个失败的回调
  then(resolveFn, rejectFn) {
    // 根据规范, 如果 then 的参数不是 function, 则我们需要忽略它, 让链式调用继续往下执行
    typeof resolveFn !== 'function' ? (resolveFn = (value) => value) : null;
    typeof rejectFn !== 'function'
      ? (rejectFn = (reason) => {
          throw new Error(reason instanceof Error ? reason.message : reason);
        })
      : null;

    // return 一个新的 promise
    return new MyPromise((resolve, reject) => {
      // 把 resolveFn 重新包装一下, 再 push 进 resolve 执行队列, 这是为了能够获取回调的返回值进行分类讨论
      const fulfilledFn = (value) => {
        try {
          // 执行第一个(当前的) Promise 的成功回调, 并获取返回值
          let x = resolveFn(value);
          // 分类讨论返回值, 如果是 Promise, 那么等待 Promise 状态变更, 否则直接 resolve
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
        } catch (error) {
          reject(error);
        }
      };

      // reject 同理
      const rejectedFn = (error) => {
        try {
          let x = rejectFn(error);
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
        } catch (error) {
          reject(error);
        }
      };

      switch (this._status) {
        // 当状态为 pending 时, 把 then 回调 push 进 resolve/reject 执行队列, 等待执行
        case PENDING:
          this._resolveQueue.push(fulfilledFn);
          this._rejectQueue.push(rejectedFn);
          break;
        // 当状态已经变为 resolve/reject 时, 直接执行 then 回调
        case FULFILLED:
          fulfilledFn(this._value); // this._value 是上一个 then 回调 return 的值(见完整版代码)
          break;
        case REJECTED:
          rejectedFn(this._value);
          break;
      }
    });
  }

  // catch 方法其实就是执行一下 then 的第二个回调
  catch(rejectFn) {
    return this.then(undefined, rejectFn);
  }

  // finally 方法
  finally(callback) {
    return this.then(
      (value) => MyPromise.resolve(callback()).then(() => value), // 执行回调, 并 return value 传递给后面的 then
      (reason) =>
        MyPromise.resolve(callback()).then(() => {
          throw reason;
        }) // reject 同理
    );
  }

  // 静态的 resolve 方法
  static resolve(value) {
    if (value instanceof MyPromise) return value; // 根据规范, 如果参数是 Promise 实例, 直接 return 这个实例
    return new MyPromise((resolve) => resolve(value));
  }

  // 静态的 reject 方法
  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason));
  }

  // 静态的 all 方法
  static all(promiseArr) {
    let index = 0;
    let result = [];
    return new MyPromise((resolve, reject) => {
      promiseArr.forEach((p, i) => {
        // Promise.resolve(p) 用于处理传入值不为 Promise 的情况
        MyPromise.resolve(p).then(
          (val) => {
            index++;
            result[i] = val;
            if (index === promiseArr.length) {
              resolve(result);
            }
          },
          (err) => {
            reject(err);
          }
        );
      });
    });
  }

  // 静态的 race 方法
  static race(promiseArr) {
    return new MyPromise((resolve, reject) => {
      // 同时执行 Promise, 如果有一个 Promise 的状态发生改变, 就变更新 MyPromise 的状态
      for (let p of promiseArr) {
        MyPromise.resolve(p).then(
          // Promise.resolve(p) 用于处理传入值不为 Promise 的情况
          (value) => {
            resolve(value); // 注意这个 resolve 是上边 new MyPromise 的
          },
          (err) => {
            reject(err);
          }
        );
      }
    });
  }
}
```
