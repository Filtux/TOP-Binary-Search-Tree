class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(array) {
      this.root = this.buildTree([...new Set(array)].sort((a, b) => a - b));
    }
  
    buildTree(array) {
      if (array.length === 0) return null;
      const middle = Math.floor(array.length / 2);
      const root = new Node(array[middle]);
      root.left = this.buildTree(array.slice(0, middle));
      root.right = this.buildTree(array.slice(middle + 1));
      return root;
    }

    insert(value) {
        const insert = (node, value) => {
            if (node === null) return new Node(value);
            if (value < node.data) node.left = insert(node.left, value);
            else if (value > node.data) node.right = insert(node.right, value);
            return node;
        };
        this.root = insert(this.root, value);
    }

    deleteItem(value) {
        const deleteNode = (node, value) => {
            if (node === null) return null;
    
            if (value < node.data) {
                node.left = deleteNode(node.left, value);
                return node;
            } else if (value > node.data) {
                node.right = deleteNode(node.right, value);
                return node;
            } else {
            // Node with only one child or no child
            if (node.left === null) return node.right;
            if (node.right === null) return node.left;
    
            // Node with two children: Find the inorder successor (smallest in the right subtree)
            let current = node.right;
            while (current.left !== null) {
              current = current.left;
            }
            node.data = current.data;
    
            // Delete the inorder successor
            node.right = deleteNode(node.right, node.data);
            return node;
            }
        };
    
        this.root = deleteNode(this.root, value);
    }

    find(value) {
        const findNode = (node, value) => {
            if (node === null || node.data === value) {
                return node;
            }
            if (value < node.data) {
                return findNode(node.left, value);
            }    
            return findNode(node.right, value);
        }
        return findNode(this.root, value);
    }

    levelOrder(callback) {
        if (this.root === null) return [];
    
        const queue = [this.root];
        const result = [];
    
        while (queue.length > 0) {
            const node = queue.shift();
            if (callback) {
                callback(node);
            } else {
                result.push(node.data);
            }
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
            }
        return callback ? null : result;
    }

    inOrder(callback) {
        const traverse = (node) => {
        if (node === null) return;
        traverse(node.left);
        if (callback) {
            callback(node);
        } else {
            result.push(node.data);
        }
        traverse(node.right);
        };
        const result = [];
        traverse(this.root);
        return callback ? null : result;
    }


    preOrder(callback) {
        const traverse = (node) => {
        if (node === null) return;
        if (callback) {
            callback(node);
        } else {
            result.push(node.data);
        }
        traverse(node.left);
        traverse(node.right);
        };

        const result = [];
        traverse(this.root);
        return callback ? null : result;
    }


    postOrder(callback) {
        const traverse = (node) => {
        if (node === null) return;
        traverse(node.left);
        traverse(node.right);
        if (callback) {
            callback(node);
        } else {
            result.push(node.data);
        }
        };

        const result = [];
        traverse(this.root);
        return callback ? null : result;
    }

    height(node) {
        if (node === null) return -1;
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node, current = this.root, depth = 0) {
        if (current === null) return -1;
        if (current === node) return depth;
        const leftDepth = this.depth(node, current.left, depth + 1);
        if (leftDepth !== -1) return leftDepth;
        return this.depth(node, current.right, depth + 1);
    }

    isBalanced() {
        const checkBalance = (node) => {
        if (node === null) return 0;
        const leftHeight = checkBalance(node.left);
        if (leftHeight === -1) return -1;
        const rightHeight = checkBalance(node.right);
        if (rightHeight === -1) return -1;
        if (Math.abs(leftHeight - rightHeight) > 1) return -1;
        return Math.max(leftHeight, rightHeight) + 1;
        };
        return checkBalance(this.root) !== -1;
    }

    rebalance() {
        const nodes = this.inOrder();
        this.root = this.buildTree(nodes);
    }  
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(testArray);

console.log(tree.root);

tree.insert(69);

prettyPrint(tree.root);