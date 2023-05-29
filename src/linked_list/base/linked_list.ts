import { EmptyLinkedList } from "../../errors/empty_linked_list";
import { HasEqualMethod } from "../../interfaces/has_equal_method";

export abstract class LinkedList<
  T extends HasEqualMethod<T> | number | string | boolean,
  Node extends { getData(): T; getNext(): Node | null }
> {
  protected head: Node | null = null;

  protected size: number = 0;

  protected constructor() {}

  public find(data: T): T | null {
    if (!this.head) throw new EmptyLinkedList();

    let current = this.head;

    while (current) {
      if (this.compare(current.getData(), data)) return current.getData();

      current = current.getNext() as Node;
    }

    return null;
  }

  public toArray(): T[] {
    if (!this.head) return [];

    let current = this.head;

    let i = 0;

    const arr: T[] = [];

    while (current) {
      arr[i++] = current.getData();

      current = current.getNext() as Node;
    }

    return arr;
  }

  public log() {
    let node = this.head;

    while (node) {
      console.log(node.getData());

      node = node.getNext();
    }
  }

  public getFirst(): T | null {
    return this.head ? this.head.getData() : null;
  }

  public getSize(): number {
    return this.size;
  }

  protected compare(a: T, b: T) {
    if (typeof a === "object" && typeof b === "object") {
      return a.equals(b);
    } else return a === b;
  }
}
