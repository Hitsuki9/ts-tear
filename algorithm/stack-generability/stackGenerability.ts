/**
 * 栈的可生成性
 * @param seq 出栈序列
 * @description 入栈顺序必须从 0 到 9
 */
export default function stackGenerability(seq: number[]) {
  const tmp: number[] = [];
  const res: (number | '-')[] = [];
  let i = 0;

  for (const element of seq) {
    if (element < i && tmp[tmp.length - 1] !== element) {
      return false;
    }
    while (element >= i) {
      tmp.push(i);
      res.push(i++);
    }
    tmp.pop();
    res.push('-');
  }

  return res.join(' ');
}
