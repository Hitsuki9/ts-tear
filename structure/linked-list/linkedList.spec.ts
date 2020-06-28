import LinkedList from './LinkedList';

const linkedList = new LinkedList();

test('linkedList is working without bugs', () => {
  linkedList.append(1);
  linkedList.append(1);
  linkedList.append(5);
  expect(linkedList.print()).toBe('1 -> 1 -> 5');
  expect(linkedList.removeAt(1)).toBe(1);
  expect(linkedList.print()).toBe('1 -> 5');
  expect(linkedList.insert(1, 1)).toBeTruthy();
  expect(linkedList.print()).toBe('1 -> 1 -> 5');
  expect(linkedList.indexOf(5)).toBe(2);
  linkedList.remove(5);
  expect(linkedList.print()).toBe('1 -> 1');
});
