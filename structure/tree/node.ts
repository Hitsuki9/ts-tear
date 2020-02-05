export default class TreeNode<T extends any> {
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;
  constructor(public val: T) {}
}
