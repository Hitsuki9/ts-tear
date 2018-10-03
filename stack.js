//es6 实现私有属性，但无法继承
const Stack = (function () {
    const items = new WeakMap();
    class Stack {
        constructor () {
            items.set(this, []);
        }
        //添加一个（或几个）新元素到栈顶
        push (element) {
            let stack = items.get(this);
            stack.push(element);
        }
        //移除栈顶的元素，同时返回被移除的元素
        pop () {
            let stack = items.get(this);
            return stack.pop();
        }
        //返回栈顶的元素
        peek () {
            let stack = items.get(this);
            return stack[stack.length - 1];
        }
        //判断栈是否为空
        isEmpty () {
            let stack = items.get(this);
            return stack.length === 0 ? true : false;
        }
        //移除栈里的所有元素
        clear () {
            items.set(this, []);
        }
        //返回栈里的元素个数
        size () {
            let stack = items.get(this);
            return stack.length;
        }
    }
    return Stack;
})();

//从十进制转换为二进制
function divideBy2 (decNumber) {
    let remStack = new Stack(),//栈实例
        rem,//除以2得到的余数
        binaryString = '';//二进制结果
    while (decNumber > 0) {
        rem = decNumber % 2;
        remStack.push(rem);
        decNumber = Math.floor(decNumber / 2);
    }
    while (!remStack.isEmpty()) {
        binaryString += remStack.pop();
    }
    return binaryString;
}
