/**
 * 使用两个栈模拟队列
 */
export default class StackQueue<T extends any> {
  private head: T[] = [];
  private tail: T[] = [];

  enqueue(element: T) {
    this.tail.push(element);
    return this;
  }

  dequeue() {
    this._transfer();
    return this.head.pop();
  }

  peek() {
    this._transfer();
    return this.head[this.head.length - 1];
  }

  private _transfer() {
    if (this.head.length) return;
    while (this.tail.length) {
      this.head.push(this.tail.pop()!);
    }
  }

  get size() {
    return this.head.length + this.tail.length;
  }
}
