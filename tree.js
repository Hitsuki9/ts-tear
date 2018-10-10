//二叉搜索树 es6 实现私有属性，但无法继承
const BinarySearchTree = (function () {
    const params = new WeakMap();
    class Node {
        constructor (key) {
            this.key = key;
            this.left = null;
            this.right = null;
        }
    }
    class BinarySearchTree {
        constructor () {
            params.set(this, {
                root: null,//根结点
                insertNode (node, newNode) {//insert方法的辅助函数 私有
                    if (newNode.key < node.key) {
                        if (node.left == null) {
                            node.left = newNode;
                        } else {
                            this.insertNode(node.left, newNode);
                        }
                    } else {
                        if (node.right == null) {
                            node.right = newNode;
                        } else {
                            this.insertNode(node.right, newNode);
                        }
                    }
                },
                searchNode (node, key) {//search方法的辅助函数 私有
                    if (node == null) {
                        return false;
                    }
                    if (key < node.key) {
                        return this.searchNode(node.left, key);
                    } else if (key > node.key) {
                        return this.searchNode(node.right, key);
                    } else {
                        return true;
                    }
                },
                inOrderTraverseNode (node, callback) {//中序遍历的辅助函数 私有
                    if (node != null) {
                        this.inOrderTraverseNode(node.left, callback);
                        callback(node.key);
                        this.inOrderTraverseNode(node.right, callback);
                    }
                },
                preOrderTraverseNode (node, callback) {//先序遍历的辅助函数 私有
                    if (node != null) {
                        callback(node.key);
                        this.preOrderTraverseNode(node.left, callback);
                        this.preOrderTraverseNode(node.right, callback);
                    }
                },
                postOrderTraverseNode (node, callback) {//后序遍历的辅助函数 私有
                    if (node != null) {
                        this.postOrderTraverseNode(node.left, callback);
                        this.postOrderTraverseNode(node.right, callback);
                        callback(node.key);
                    }
                },
                minNode (node) {//min方法的辅助函数 私有
                    if (node) {
                        while (node.left != null) {
                            node = node.left;
                        }
                        return node.key;
                    }
                    return null;
                },
                maxNode (node) {//max方法的辅助函数 私有
                    if (node) {
                        while (node.right != null) {
                            node = node.right;
                        }
                        return node.key;
                    }
                    return null;
                },
                removeNode (node, key) {
                }
            });
        }
        //向树中插入一个新的结点
        insert (key) {
            let bst = params.get(this);
            let node = new Node(key);
            if (bst.root == null) {
                bst.root = node;
            } else {
                bst.insertNode(bst.root, node);
            }
        }
        //通过键值在树中查找一个结点，如果结点存在，则返回true，否则返回false
        search (key) {
            let bst = params.get(this);
            return bst.searchNode(bst.root, key);
        }
        //通过中序遍历方式遍历所有结点
        inOrderTraverse (callback) {
            let bst = params.get(this);
            bst.inOrderTraverseNode(bst.root, function (value) {
                console.log(value);
            });
        }
        //通过先序遍历方式遍历所有结点
        preOrderTraverse () {
            let bst = params.get(this);
            bst.preOrderTraverseNode(bst.root, function (value) {
                console.log(value);
            });
        }
        //通过后序遍历方式遍历所有结点
        postOrderTraverse () {
            let bst = params.get(this);
            bst.postOrderTraverseNode(bst.root, function (value) {
                console.log(value);
            });
        }
        //返回树中最小的键值
        min () {
            let bst = params.get(this);
            return bst.minNode(bst.root);
        }
        //返回树中最大的键值
        max () {
            let bst = params.get(this);
            return bst.maxNode(bst.root);
        }
        //从树中移除某个结点
        remove (key) {}
    }
    return BinarySearchTree;
})();

let tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.inOrderTraverse();
console.log('------------------------------------------');
tree.preOrderTraverse();
console.log('------------------------------------------');
tree.postOrderTraverse();
console.log('------------------------------------------');
console.log(tree.min());
console.log('------------------------------------------');
console.log(tree.max());
console.log('------------------------------------------');
console.log(tree.search(5));
console.log('------------------------------------------');
console.log(tree.search(6));
console.log('------------------------------------------');
