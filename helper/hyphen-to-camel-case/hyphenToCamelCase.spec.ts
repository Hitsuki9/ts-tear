import hyphenToCamelCase from './hyphenToCamelCase';

test('hyphenToCamelCase function is working without bugs', () => {
  expect(hyphenToCamelCase('deep-clone')).toBe('deepClone');
  expect(hyphenToCamelCase('hyphen-to-camel-case')).toBe('hyphenToCamelCase');
});
