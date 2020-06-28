import reverseList from './reverseList';
import LinkedList from '../../structure/linked-list/LinkedList';

test('reverseList function is working without bugs', () => {
  const linkedList1 = new LinkedList();
  expect(reverseList(linkedList1).print()).toBe('');
  linkedList1.append(1);
  expect(reverseList(linkedList1).print()).toBe('1');
  linkedList1.append(9);
  expect(reverseList(linkedList1).print()).toBe('9 -> 1');
  linkedList1.insert(1, 8);
  linkedList1.insert(1, 2);
  expect(reverseList(linkedList1).print()).toBe('1 -> 8 -> 2 -> 9');
});
