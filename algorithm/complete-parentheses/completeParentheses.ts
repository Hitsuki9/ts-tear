const Operators = ['+', '-', '*', '/'];

/**
 * 补全表达式的左括号
 * @param exp 缺少左括号的表达式
 */
export default function completeParentheses(exp: string) {
  const operatorStack: string[] = []; // 操作符栈
  const dataStack: string[] = []; // 操作数栈

  for (const char of exp) {
    if (Operators.includes(char)) {
      operatorStack.push(char);
    } else if (char === ')') {
      const rightData = dataStack.pop();
      const leftData = dataStack.pop();
      const operator = operatorStack.pop();
      dataStack.push(`(${leftData}${operator}${rightData})`);
    } else {
      dataStack.push(char);
    }
  }

  while (operatorStack.length) {
    const rightData = dataStack.pop();
    const leftData = dataStack.pop();
    const operator = operatorStack.pop();
    dataStack.push(`${leftData}${operator}${rightData}`);
  }

  return dataStack.pop();
}
