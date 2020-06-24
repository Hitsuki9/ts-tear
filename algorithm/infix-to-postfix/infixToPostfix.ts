const Operators = ['+', '-', '*', '/'];
const Priority: Record<string, number> = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  '(': 0
};

/**
 * 中序表达式转后序表达式（逆波兰式）
 * @param exp 中序表达式
 */
export default function infixToPostfix(exp: string) {
  const operatorStack: string[] = []; // 操作符栈
  const dataStack: string[] = []; // 操作数栈
  let data = '';

  function initData() {
    if (data.length) {
      dataStack.push(data);
      data = '';
    }
  }

  function spliceData() {
    const rightData = dataStack.pop();
    const leftData = dataStack.pop();
    const operator = operatorStack.pop();
    dataStack.push(`${leftData} ${rightData} ${operator}`);
  }

  for (const char of exp) {
    if (char === '(') operatorStack.push(char);
    else if (char === ')') {
      initData();
      while (operatorStack[operatorStack.length - 1] !== '(') {
        spliceData();
      }
      operatorStack.pop();
    }
    // 操作符
    else if (Operators.includes(char)) {
      initData();
      while (
        operatorStack.length &&
        Priority[operatorStack[operatorStack.length - 1]] >= Priority[char]
      ) {
        spliceData();
      }
      operatorStack.push(char);
    }
    // 操作数
    else data += char;
  }

  initData();

  while (operatorStack.length) {
    spliceData();
  }

  return dataStack.pop();
}
