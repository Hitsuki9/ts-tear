import ListNode from './node';

/**
 * 链表
 */
export default class LinkedList<T extends any> {
  head: ListNode<T> | null = null;
  length: number = 0;
  /**
   * 在链表末尾追加节点
   * @param element
   */
  append(element: T) {
    const node = new ListNode(element);
    if (this.head === null) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.length++;
  }
  /**
   * 在链表指定位置插入节点
   * @param position
   * @param element
   */
  insert(position: number, element: T) {
    if (position > -1 && position < this.length) {
      const node = new ListNode(element);
      let current = this.head;
      if (position === 0) {
        node.next = current;
        this.head = node;
      } else {
        let previous: ListNode<T>;
        let i = 0;
        while (i++ < position) {
          previous = current as ListNode<T>;
          current = (current as ListNode<T>).next;
        }
        node.next = current;
        previous!.next = node;
      }
      this.length++;
      return true;
    } else {
      return false;
    }
  }
  /**
   * 删除链表节点
   * @param element
   */
  remove(element: T) {
    const idx = this.indexOf(element);
    return this.removeAt(idx);
  }
  /**
   * 删除链表指定位置的节点
   * @param position
   */
  removeAt(position: number) {
    if (position > -1 && position < this.length) {
      let current: ListNode<T> | null = this.head as ListNode<T>;
      if (position === 0) {
        this.head = current.next;
      } else {
        let previous: ListNode<T>;
        let i = 0;
        while (i++ < position) {
          previous = current as ListNode<T>;
          current = (current as ListNode<T>).next;
        }
        previous!.next = (current as ListNode<T>).next;
      }
      this.length--;
      return (current as ListNode<T>).element;
    } else {
      return null;
    }
  }
  indexOf(element: T) {
    let idx = 0;
    let current = this.head;
    while (current) {
      if (element === current.element) {
        return idx;
      }
      idx++;
      current = current.next;
    }
    return -1;
  }
  print() {
    let current = this.head;
    let res = [];
    while (current) {
      res.push(current.element);
      current = current.next;
    }
    return res.join(' -> ');
  }
}
