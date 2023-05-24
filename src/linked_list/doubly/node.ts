export class Node<T> {
  private previous: Node<T> | null = null;
  private next: Node<T> | null = null;
  private data: T;

  constructor(data: T) {
    this.data = data;
  }

  public setNext(next: Node<T> | null): void {
    this.next = next;
  }

  public setPrevious(prev: Node<T> | null): void {
    this.previous = prev;
  }

  public getNext(): Node<T> | null {
    return this.next;
  }

  public getPrevious(): Node<T> | null {
    return this.previous;
  }

  public getData(): T {
    return this.data;
  }

  public setData(data: T): void {
    this.data = data;
  }
}
