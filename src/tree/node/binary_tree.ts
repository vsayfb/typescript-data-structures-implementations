export class BinaryTree<T> {
  private data: T;

  private leftChild: BinaryTree<T> | null = null;

  private rightChild: BinaryTree<T> | null = null;

  constructor(data: T) {
    if (data === null) throw new Error("Null is not expected.");

    this.data = data;
  }

  public getData(): T {
    return this.data;
  }

  public getLeft(): BinaryTree<T> | null {
    return this.leftChild;
  }

  public getRight(): BinaryTree<T> | null {
    return this.rightChild;
  }

  public setData(data: T): void {
    this.data = data;
  }

  public setLeft(child: BinaryTree<T> | null): void {
    this.leftChild = child;
  }

  public setRight(child: BinaryTree<T> | null): void {
    this.rightChild = child;
  }
}
