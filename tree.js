//二叉搜索树 es6 实现私有属性，但无法继承
const BinarySearchTree = (function () {
    let params = new WeakMap();
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
                root: null
            });
        }
        insert (key) {}
        search (key) {}
        inOrderTraverse () {}
        preOrderTraverse () {}
        postOrderTraverse () {}
        min () {}
        max () {}
        remove (key) {}
    }
    return BinarySearchTree;
})();