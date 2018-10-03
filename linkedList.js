//单向链表 es6 实现私有属性，但无法继承
const LinkedList = (function () {
    const params = new WeakMap();
    class Node {
        constructor (element) {
            this.element = element;
            this.next = null;
        }
    }
    class LinkedList {
        constructor () {
            params.set(this, {
                length: 0,//链表长度
                head: null//链表
            });
        }
        //向链表尾部添加一个新的项
        append (element) {
            let linkedList = params.get(this);
            let node = new Node(element),
                current;
            if (linkedList.head === null) {//判断是否有头结点
                linkedList.head = node;
            } else {
                current = linkedList.head;
                while (current.next) {
                    current = current.next;
                }
                current.next = node;
            }
            linkedList.length++;
        }
        //向链表的特定位置插入一个新的项,插入成功返回true，否则返回false
        insert (position, element) {
            let linkedList = params.get(this);
            if (position >= 0 && position <= linkedList.length) {//判断索引参数是否有效
                let node = new Node(element),
                    current = linkedList.head,//当前结点（插入位置原来的结点）
                    previous,//前结点
                    index = 0;//索引
                if (position === 0) {
                    node.next = current;
                    linkedList.head = node;
                } else {
                    while (index++ < position) {
                        previous = current;
                        current = current.next;
                    }
                    node.next = current;
                    previous.next = node;
                }
                linkedList.length++;
                return true;
            } else {
                return false;
            }
        }
        //从链表中删除一项
        remove (element) {
            let index = this.indexOf(element);
            return this.removeAt(index);
        }
        //返回元素在链表中的索引，如果链表中没有该元素则返回-1
        indexOf (element) {
            let linkedList = params.get(this);
            let current = linkedList.head,//当前结点（查找的结点）
                index = 0;//索引
            while (current) {
                if (element === current.element) {
                    return index;
                }
                index++;
                current = current.next
            }
            return -1;
        }
        //从链表的特定位置移除一项
        removeAt (position) {
            let linkedList = params.get(this);
            if (position >= 0 && position < linkedList.length) {//判断索引参数是否有效
                let current = linkedList.head,//当前结点(将删除的结点)
                    previous,//前结点
                    index = 0;//索引
                if (position === 0) {
                    linkedList.head = current.next;
                } else {
                    while (index++ < position) {
                        previous = current;
                        current = current.next;
                    }
                    previous.next = current.next;
                }
                linkedList.length--;
                return current.element;
            } else {
                return null;
            }
        }
        //判断链表是否为空
        isEmpty () {
            let linkedList = params.get(this);
            return linkedList.length === 0;
        }
        //返回链表包含的元素个数
        size () {
            let linkedList = params.get(this);
            return linkedList.length;
        }
        getHead () {
            let linkedList = params.get(this);
            return linkedList.head;
        }
    }
    return LinkedList;
})();