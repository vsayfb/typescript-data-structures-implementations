import { KeyValuePair } from "../../hashtable/helper/key_value_pair";
import { BinaryTree } from "../node/binary_tree";

export class BinarySearchTree<K extends string | number, T> {
  private root: BinaryTree<KeyValuePair<K, T>> | null = null;

  insert(key: K, data: T): void {
    let root = this.root;

    if (root === null) {
      this.root = new BinaryTree(new KeyValuePair(key, data));
    } else {
      this.add(root, key, data);
    }
  }

  get(key: K): T | null {
    const root = this.root;

    if (root === null) return null;

    return this.find(root, key);
  }

  remove(key: K) {
    const root = this.root;

    if (root === null) return null;

    const removed = this.removeNode(root, key);

    if (removed === null) return null;

    return removed;
  }

  min(): T | null {
    const root = this.root;

    if (root === null) return null;

    return this.findMinimum(root).getData().getData();
  }

  max(): T | null {
    const root = this.root;

    if (root === null) return null;

    return this.findMaximum(root).getData().getData();
  }

  toArray(): T[] {
    const arr: T[] = [];

    this.inorder(this.root, arr);

    return arr;
  }

  private add(node: BinaryTree<KeyValuePair<K, T>>, key: K, data: T): void {
    if (this.isLeftSmaller(key, node.getData().getKey())) {
      const current = node.getLeft();

      current === null
        ? node.setLeft(new BinaryTree(new KeyValuePair(key, data)))
        : this.add(current, key, data);
    } else if (this.isLeftSmaller(node.getData().getKey(), key)) {
      const current = node.getRight();

      current === null
        ? node.setRight(new BinaryTree(new KeyValuePair(key, data)))
        : this.add(current, key, data);
    } else {
      return node.getData().setData(data);
    }
  }

  private find(node: BinaryTree<KeyValuePair<K, T>>, key: K): T | null {
    if (this.equals(key, node.getData().getKey()))
      return node.getData().getData();

    if (this.isLeftSmaller(key, node.getData().getKey())) {
      const left = node.getLeft();

      if (left === null) return null;

      return this.find(left, key);
    } else {
      const right = node.getRight();

      if (right === null) return null;

      return this.find(right, key);
    }
  }

  private removeNode(node: BinaryTree<KeyValuePair<K, T>>, key: K) {
    let parent = node;

    let child: BinaryTree<KeyValuePair<K, T>> | null = node;

    while (child !== null && !this.equals(child.getData().getKey(), key)) {
      parent = child;

      child = this.isLeftSmaller(key, child.getData().getKey())
        ? child.getLeft()
        : child.getRight();
    }

    if (child === null) return null;

    const removed = child.getData().getData();

    if (this.equals(parent.getData().getKey(), child.getData().getKey())) {
      return this.removeRoot();
    }

    if (!this.hasLeft(child) && !this.hasRight(child)) {
      if (this.isChildAtLeft(child, parent)) {
        parent.setLeft(null);
      } else {
        parent.setRight(null);
      }
    } else if (this.hasLeft(child) && !this.hasRight(child)) {
      if (this.isChildAtLeft(child, parent)) {
        parent.setLeft(child.getLeft());
      } else {
        parent.setRight(child.getLeft());
      }
    } else if (this.hasRight(child) && !this.hasLeft(child)) {
      if (this.isChildAtLeft(child, parent)) {
        parent.setLeft(child.getRight());
      } else {
        parent.setRight(child.getRight());
      }
    } else {
      const min = this.findMinimum(child.getRight());

      this.removeNode(child, min.getData().getKey());

      child.setData(min.getData());
    }

    return removed;
  }

  private removeRoot() {
    const root = this.root;

    if (root == null) return null;

    const left = root.getLeft();
    const right = root.getRight();

    const removed = root.getData().getData();

    if (!left && !right) this.root = null;
    else if (left && !right) this.root = left;
    else if (right && !left) this.root = right;
    else {
      const min = this.findMinimum(right);

      this.removeNode(root, min.getData().getKey());

      root.setData(min.getData());

      this.root = root;
    }

    return removed;
  }

  private findMinimum(
    node: BinaryTree<KeyValuePair<K, T>> | null
  ): BinaryTree<KeyValuePair<K, T>> {
    if (node?.getLeft() === null) return node;

    return this.findMinimum(node?.getLeft() as BinaryTree<KeyValuePair<K, T>>);
  }

  private findMaximum(
    node: BinaryTree<KeyValuePair<K, T>> | null
  ): BinaryTree<KeyValuePair<K, T>> {
    if (node?.getRight() === null) return node;

    return this.findMaximum(node?.getRight() as BinaryTree<KeyValuePair<K, T>>);
  }

  private inorder(node: BinaryTree<KeyValuePair<K, T>> | null, arr: T[]): void {
    if (node === null) return;

    this.inorder(node.getLeft(), arr);

    arr.push(node.getData().getData());

    this.inorder(node.getRight(), arr);
  }

  private isLeftSmaller(key: K, other: K) {
    return key < other;
  }

  private equals(key: K, other: K) {
    return key === other;
  }

  private hasLeft(node: BinaryTree<KeyValuePair<K, T>>) {
    return node.getLeft() !== null;
  }

  private hasRight(node: BinaryTree<KeyValuePair<K, T>>) {
    return node.getRight() !== null;
  }

  private isChildAtLeft(
    child: BinaryTree<KeyValuePair<K, T>>,
    parent: BinaryTree<KeyValuePair<K, T>>
  ) {
    const leftChild = parent.getLeft();

    return (
      leftChild !== null &&
      this.equals(leftChild.getData().getKey(), child.getData().getKey())
    );
  }
}
