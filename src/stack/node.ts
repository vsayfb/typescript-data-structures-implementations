export class Node<T> {
  private previous: Node<T> | null = null;

  public constructor(private data: T) {}

  public setPrevious(node: Node<T>) {
    this.previous = node;
  }

  public getPrevios() {
    return this.previous;
  }

  public getData() {
    return this.data;
  }

  public setData(data: T) {
    this.data = data;
  }
}
