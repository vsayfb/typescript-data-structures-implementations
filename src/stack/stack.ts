import { StackInterface } from "./interfaces/stack";
import { EmptyStack } from "./errors/empty_stack";
import { Node } from "./node";

export class Stack<T> implements StackInterface<T> {
  private size: number = 0;

  private top: Node<T> | null = null;

  push(data: T): void {
    const node = new Node(data);

    if (this.top) node.setPrevious(this.top);

    this.top = node;

    this.size++;
  }

  pop(): T {
    if (!this.top) throw new EmptyStack();

    const top = this.top;

    const previousTop = this.top.getPrevios();

    this.top = previousTop;

    this.size--;

    return top.getData();
  }

  peek(): T | null {
    return this.top ? this.top.getData() : null;
  }

  isEmpty(): boolean {
    return !this.top;
  }

  getSize(): number {
    return this.size;
  }

  toArray(): T[] {
    const arr: T[] = [];

    let current = this.top;

    while (current) {
      arr.push(current.getData());

      current = current.getPrevios();
    }

    return arr;
  }
  
}
