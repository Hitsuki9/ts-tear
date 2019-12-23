import flat from './flat';

const arr1 = [1, [2, 3, [4]]];
const arr2 = ['🐮', ['🍺', , ['🐴', ['🐶', ['🚉', , ['😵', ,]]], '🚘']]];

test('flat function is working without bugs', () => {
  expect(flat(arr1)).toEqual([1, 2, 3, [4]]);
  expect(flat(arr1, 2)).toEqual([1, 2, 3, 4]);
  expect(flat(arr2, 3)).toEqual([
    '🐮',
    '🍺',
    '🐴',
    '🐶',
    ['🚉', , ['😵', ,]],
    '🚘'
  ]);
  expect(flat(arr2, Infinity)).toEqual([
    '🐮',
    '🍺',
    '🐴',
    '🐶',
    '🚉',
    '😵',
    '🚘'
  ]);
});
