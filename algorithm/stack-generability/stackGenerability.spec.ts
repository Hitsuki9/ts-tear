import stackGenerability from './stackGenerability';

test('stackGenerability function is working without bugs', () => {
  expect(stackGenerability([2, 5, 6, 7, 4, 8, 9, 3, 1, 0])).toBe(
    '0 1 2 - 3 4 5 - 6 - 7 - - 8 - 9 - - - -'
  );
  expect(stackGenerability([4, 6, 8, 7, 5, 3, 2, 9, 0, 1])).toBeFalsy();
  expect(stackGenerability([2, 1, 4, 3, 6, 5, 8, 7, 9, 0])).toBe(
    '0 1 2 - - 3 4 - - 5 6 - - 7 8 - - 9 - -'
  );
});
