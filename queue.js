//es6 实现私有属性，但无法继承
const Queue = (function () {
    const items = new WeakMap();
    class Queue {
        constructor () {
            items.set(this, []);
        }
        //向队列尾部添加一个（或几个）新的项
        enqueue (element) {
            let queue = items.get(this);
            queue.push(element);
        }
        //移除队列的第一项，并返回被移除的元素
        dequeue () {
            let queue = items.get(this);
            return queue.shift();
        }
        //返回队列的第一个元素
        front () {
            let queue = items.get(this);
            return queue[0];
        }
        //判断队列是否为空
        isEmpty () {
            let queue = items.get(this);
            return queue.length === 0 ? true : false;
        }
        //返回队列包含的元素个数
        size () {
            let queue = items.get(this);
            return queue.length;
        }
    }
    return Queue;
})();

//最小优先队列（设置优先级，在正确的位置添加元素） es6
const PriorityQueue = (function PriorityQueue () {
    const items = new WeakMap();
    class QueueElement {
        constructor (element, priority) {
            this.element = element;
            this.priority = priority;//优先级，值越大优先级越低
        }
    }
    class PriorityQueue {
        constructor () {
            items.set(this, []);
        }
        enqueue (element, priority) {
            let queueElement = new QueueElement(element, priority);
            let added = false;//标志位，判断是否因优先级高而插入
            let queue = items.get(this);
            for (let i = 0; i < queue.length; i++) {
                if (queueElement.priority < queue[i].priority) {
                    queue.splice(i, 0, queueElement);
                    added = true;
                    break;
                }
            }
            if (!added) {
                queue.push(queueElement);
            }
        }
        //其她队列方法（dequeue, front, isEmpty, size）
    }
    return PriorityQueue;
})();

//循环队列（击鼓传花） es6
function hotPotato (nameList, num) {
    let queue = new Queue();
    for (let i = 0; i < nameList.length; i++) {
        queue.enqueue(nameList[i]);
    }
    while (queue.size() > 1){
        for (let i = 0; i < num; i++) {
            queue.enqueue(queue.dequeue());//从队列开头移除一项并将此项添加到队列末尾
        }
    }
    return queue.dequeue();//最后留下的一项
}
