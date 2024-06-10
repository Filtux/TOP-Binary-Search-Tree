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