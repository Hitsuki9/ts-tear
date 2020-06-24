import completeParentheses from './completeParentheses';

test('completeParentheses function is working without bugs', () => {
  expect(completeParentheses('1+2)*3-4)*5-6)))')).toBe('((1+2)*((3-4)*(5-6)))');
  expect(completeParentheses('2+2*5-6)))/3)')).toBe('((2+(2*(5-6)))/3)');
  expect(completeParentheses('2+2*5-6)))/3')).toBe('(2+(2*(5-6)))/3');
  expect(completeParentheses('2+2*5-6)))/3-2')).toBe('(2+(2*(5-6)))/3-2');
  expect(completeParentheses('12+3)*2')).toBe('(12+3)*2');
  expect(completeParentheses('1.2+3.6)*2/2.0')).toBe('(1.2+3.6)*2/2.0');
});
