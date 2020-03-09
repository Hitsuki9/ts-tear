export type Item = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '.';

/**
 * 解数独
 * @param board 数独
 */
export default function sudoku(board: Item[][]) {
  const rowUsed: boolean[][] = [],
    colUsed: boolean[][] = [],
    boxUsed: boolean[][] = [];
  for (let i = 0; i < 9; i++) {
    rowUsed[i] = new Array(9).fill(false);
    colUsed[i] = new Array(9).fill(false);
    boxUsed[i] = new Array(9).fill(false);
  }
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] !== '.') {
        const num = Number.parseInt(board[row][col]) - 1;
        rowUsed[row][num] = true;
        colUsed[col][num] = true;
        boxUsed[Math.floor(row / 3) * 3 + Math.floor(col / 3)][num] = true;
      }
    }
  }
  /**
   * 回溯辅助函数
   * @param row 行数
   * @param col 列数
   */
  function backtrack(row: number, col: number): true | undefined {
    if (row >= 9) return true;
    let nextRow, nextCol;
    if (col + 1 === 9) {
      nextRow = row + 1;
      nextCol = 0;
    } else {
      nextRow = row;
      nextCol = col + 1;
    }
    if (board[row][col] !== '.') return backtrack(nextRow, nextCol);
    for (let i = 0; i < 9; i++) {
      if (
        !rowUsed[row][i] &&
        !colUsed[col][i] &&
        !boxUsed[Math.floor(row / 3) * 3 + Math.floor(col / 3)][i]
      ) {
        board[row][col] = (i + 1).toString() as Item;
        rowUsed[row][i] = true;
        colUsed[col][i] = true;
        boxUsed[Math.floor(row / 3) * 3 + Math.floor(col / 3)][i] = true;
        const flag = backtrack(nextRow, nextCol);
        if (flag) return flag;
        rowUsed[row][i] = false;
        colUsed[col][i] = false;
        boxUsed[Math.floor(row / 3) * 3 + Math.floor(col / 3)][i] = false;
        board[row][col] = '.';
      }
    }
  }
  backtrack(0, 0);
}
