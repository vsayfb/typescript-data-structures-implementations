import { HasEqualMethod } from "../../interfaces/has_equal_method";
import { NoSuchElement } from "../../errors/no_such_element";
import { EmptyLinkedList } from "../../errors/empty_linked_list";
import { Node } from "./node";
import { LinkedList } from "../base/linked_list";
import { LinkedListInterface } from "../../interfaces/linked_list";

export class SinglyLinkedList<
    T extends HasEqualMethod<T> | number | string | boolean
  >
  extends LinkedList<T, Node<T>>
  implements LinkedListInterface<T>
{
  public constructor() {
    super();
  }

  public addFirst(data: T): void {
    const node = new Node(data);

    node.setNext(this.head);

    this.head = node;

    this.size++;
  }

  public removeFirst(): T {
    if (!this.head) throw new EmptyLinkedList();

    const head = this.head;

    this.head = this.head.getNext();

    this.size--;

    return head.getData();
  }

  public addLast(data: T): void {
    if (!this.head) return this.addFirst(data);

    let current = this.head;

    while (current.getNext()) {
      current = current.getNext() as Node<T>;
    }

    const node = new Node(data);

    current.setNext(node);

    node.setNext(null);

    this.size++;
  }

  public removeLast(): T {
    let current = this.head;

    if (!current) throw new EmptyLinkedList();

    if (!current.getNext()) return this.removeFirst();

    let remove = current.getData();

    while (current) {
      if (!current.getNext()?.getNext()) {
        remove = current.getNext()?.getData() as T;

        current.setNext(null);

        break;
      }

      current = current.getNext() as Node<T>;
    }

    this.size--;

    return remove;
  }

  public getLast(): T {
    let current = this.head;

    while (current && current.getNext()) current = current.getNext() as Node<T>;

    return current ? current.getData() : (null as unknown as T);
  }

  public addBefore(data: T, before: T): void {
    const head = this.getFirst();

    if (head === null) throw new EmptyLinkedList();

    if (this.compare(head, before)) {
      return this.addFirst(data);
    }

    let current: Node<T> | null = this.head;

    while (current) {
      const currentNext = current.getNext();

      if (currentNext && this.compare(currentNext.getData(), before)) {
        const node = new Node(data);

        node.setNext(currentNext);

        current.setNext(node);

        this.size++;

        return;
      }

      current = current.getNext();
    }

    throw new NoSuchElement();
  }

  public removeBefore(before: T): T {
    if (!this.head) throw new EmptyLinkedList();

    if (!this.head.getNext()) throw new NoSuchElement();

    if (this.compare(this.head.getNext()?.getData() as T, before)) {
      return this.removeFirst();
    }

    let current: Node<T> | null = this.head;

    while (current) {
      const currentNext = current.getNext();

      if (currentNext) {
        const currentNextNext = currentNext.getNext();

        if (
          currentNextNext &&
          this.compare(currentNextNext.getData(), before)
        ) {
          const removed = currentNext.getData();

          current.setNext(currentNextNext);

          this.size--;

          return removed;
        }
      }

      current = current.getNext();
    }

    throw new NoSuchElement();
  }

  public addAfter(data: T, after: T) {
    if (!this.head) throw new EmptyLinkedList();

    let current = this.head;

    while (current) {
      if (this.compare(current.getData(), after)) {
        const node = new Node(data);

        node.setNext(current.getNext());

        current.setNext(node);

        this.size++;

        return;
      }

      current = current.getNext() as Node<T>;
    }

    throw new NoSuchElement();
  }

  public removeAfter(after: T): T {
    if (!this.head) throw new EmptyLinkedList();

    let current = this.head;

    if (!current.getNext()) throw new NoSuchElement();

    while (current) {
      if (this.compare(current.getData(), after)) {
        const currentNext = current.getNext();

        if (!currentNext) throw new NoSuchElement();

        current.setNext(currentNext.getNext());

        this.size--;

        return currentNext.getData();
      }

      current = current.getNext() as Node<T>;
    }

    throw new NoSuchElement();
  }

  public remove(data: T): T | null {
    if (!this.head) throw new EmptyLinkedList();

    if (this.compare(this.head.getData(), data)) return this.removeFirst();

    let current: Node<T> | null = this.head;

    while (current && current.getNext()) {
      const currentNext = current.getNext();

      if (currentNext && this.compare(currentNext.getData(), data)) {
        const currentNextNext = currentNext.getNext();

        current.setNext(currentNextNext);

        this.size--;

        return currentNext.getData();
      }

      current = current.getNext();
    }

    return null;
  }

  public isEmpty(): boolean {
    return !this.head;
  }
}
