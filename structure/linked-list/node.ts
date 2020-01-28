export default class ListNode<T extends any> {
  next: ListNode<T> | null = null;
  constructor(public element: T) {}
}
