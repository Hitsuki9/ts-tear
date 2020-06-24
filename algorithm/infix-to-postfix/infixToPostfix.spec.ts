import infixToPostfix from './infixToPostfix';

test('infixToPostfix function is working without bugs', () => {
  expect(infixToPostfix('2+(3+4)*5*6')).toBe('2 3 4 + 5 * 6 * +');
  expect(infixToPostfix('(2+(3+4)*5)*6')).toBe('2 3 4 + 5 * + 6 *');
  expect(infixToPostfix('(2+(3.2+4)*51)*6')).toBe('2 3.2 4 + 51 * + 6 *');
  expect(infixToPostfix('((3.2/3)*(9/(2+1))+1.2)/(2*3)')).toBe(
    '3.2 3 / 9 2 1 + / * 1.2 + 2 3 * /'
  );
});
