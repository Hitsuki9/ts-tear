import memorize from './memorize';

let i = 0;
function plusS(str: string) {
  i++;
  return str + 's';
}
const memorizedPlusS = memorize(plusS);

test('memorize function is working without bugs', () => {
  expect(memorizedPlusS('cat')).toBe('cats');
  expect(memorizedPlusS('cat')).toBe('cats');
  expect(memorizedPlusS('dog')).toBe('dogs');
  expect(i).toBe(2);
});
