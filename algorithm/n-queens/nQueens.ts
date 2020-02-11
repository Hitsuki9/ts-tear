/**
 * N 皇后
 * @param n 棋盘大小
 */
export default function nQueens(n: number): string[][] {
  const res: string[][] = [];
  const board: string[] = [];
  const defaultRow = new Array(n).fill('.').join('');
  for (let i = 0; i < n; i++) {
    board[i] = defaultRow;
  }
  /**
   * 回溯辅助函数
   * @param row 当前行数
   * @param col 已有皇后的列数集合
   * @param slash 已有皇后的斜线集合
   * @param backslash 已有皇后的反斜线集合
   */
  function backtrack(
    row: number,
    col: number[],
    slash: number[],
    backslash: number[]
  ) {
    if (row === n) {
      res.push(board.slice());
      return;
    }
    for (let i = 0; i < n; i++) {
      if (
        !(
          col.includes(i) ||
          slash.includes(i + row) ||
          backslash.includes(i - row)
        )
      ) {
        board[row] = board[row].slice(0, i) + 'Q' + board[row].slice(i + 1);
        backtrack(
          row + 1,
          [...col, i],
          [...slash, i + row],
          [...backslash, i - row]
        );
        board[row] = defaultRow;
      } else {
        continue;
      }
    }
  }
  backtrack(0, [], [], []);
  return res;
}
