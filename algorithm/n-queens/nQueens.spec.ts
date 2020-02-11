import nQueens from './nQueens';

test('nQueens function is working without bugs', () => {
  expect(nQueens(4)).toEqual([
    ['.Q..', '...Q', 'Q...', '..Q.'],
    ['..Q.', 'Q...', '...Q', '.Q..']
  ]);
  expect(nQueens(6)).toEqual([
    ['.Q....', '...Q..', '.....Q', 'Q.....', '..Q...', '....Q.'],
    ['..Q...', '.....Q', '.Q....', '....Q.', 'Q.....', '...Q..'],
    ['...Q..', 'Q.....', '....Q.', '.Q....', '.....Q', '..Q...'],
    ['....Q.', '..Q...', 'Q.....', '.....Q', '...Q..', '.Q....']
  ]);
});
