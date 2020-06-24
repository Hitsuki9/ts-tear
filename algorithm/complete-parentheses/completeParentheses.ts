const Operators = ['+', '-', '*', '/'];

/**
 * 补全表达式的左括号
 * @param exp 缺少左括号的表达式
 */
export default function completeParentheses(exp: string) {
  const operatorStack: string[] = []; // 操作符栈
  const dataStack: string[] = []; // 操作数栈
  let data = '';

  function initData() {
    if (data.length) {
      dataStack.push(data);
      data = '';
    }
  }

  for (const char of exp) {
    // 操作符
    if (Operators.includes(char)) {
      initData();
      operatorStack.push(char);
    } else if (char === ')') {
      initData();
      const rightData = dataStack.pop();
      const leftData = dataStack.pop();
      const operator = operatorStack.pop();
      dataStack.push(`(${leftData}${operator}${rightData})`);
    }
    // 操作数
    else data += char;
  }

  // 不以 ) 结尾的情况
  initData();
  while (operatorStack.length) {
    const rightData = dataStack.pop();
    const leftData = dataStack.pop();
    const operator = operatorStack.pop();
    dataStack.push(`${leftData}${operator}${rightData}`);
  }

  return dataStack.pop();
}
