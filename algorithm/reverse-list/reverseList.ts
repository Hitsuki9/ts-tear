import LinkedList from '../../structure/linked-list/LinkedList';
import ListNode from '../../structure/linked-list/Node';

type Node<T> = ListNode<T> | null;

/**
 * 反转链表
 * @param linkedList 链表l
 */
export default function reverseList<T extends any>(linkedList: LinkedList<T>) {
  const head = linkedList.head;
  if (head === null) return linkedList;
  // 迭代
  let prev = null;
  let cur: Node<T> = head;
  while (cur !== null) {
    const next: Node<T> = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  linkedList.head = prev;
  return linkedList;
}
