import StackQueue from './StackQueue';

const sq = new StackQueue();

test('StackQueue is working without bugs', () => {
  expect(sq.enqueue(1).enqueue(2).enqueue(3).enqueue(4).peek()).toBe(1);
  expect(sq.dequeue()).toBe(1);
  expect(sq.peek()).toBe(2);
  expect(sq.size).toBe(3);
  expect(sq.enqueue(5).enqueue(6).peek()).toBe(2);
  sq.dequeue();
  sq.dequeue();
  sq.dequeue();
  expect(sq.dequeue()).toBe(5);
});
