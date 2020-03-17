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
Promise.prototype.then = function(onResolved) {
  var self = this;
  // 返回一个新的 promise
  return new Promise((resolve) => {
    self.onResolvedCallback.push(function() {
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
