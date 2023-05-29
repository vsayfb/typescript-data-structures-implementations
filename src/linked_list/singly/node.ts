export class Node<T> {
  private next: Node<T> | null = null;
  private data: T;

  constructor(data: T) {
    this.data = data;
  }

  public getData(): T {
    return this.data;
  }

  public setData(data: T) {
    this.data = data;
  }

  public getNext(): Node<T> | null {
    return this.next;
  }

  public setNext(next: Node<T> | null) {
    this.next = next;
  }
}
