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
        print () {
            let queue = items.get(this);
            console.log(queue);
        }
    }
    //其她队列方法（dequeue, front, isEmpty, size）
    return PriorityQueue;
})();

//循环队列（击鼓传花） es6
