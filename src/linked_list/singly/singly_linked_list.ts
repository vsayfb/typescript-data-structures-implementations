import { LinkedList } from "../../interfaces/linked_list";
import { HasEqualMethod } from "../../interfaces/has_equal_method";

import { NoSuchElement } from "../../errors/no_such_element";
import { EmptyLinkedList } from "../../errors/empty_linked_list";

import { Node } from "./node";

export class SinglyLinkedList<
  T extends HasEqualMethod<T> | number | string | boolean
> implements LinkedList<T>
{
  private head: Node<T> | null = null;

  private size: number = 0;

  public constructor() {}

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

    while (current && current.getNext()) {
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

  public getFirst(): T {
    return this.head ? this.head.getData() : (null as unknown as T);
  }

  public getLast(): T {
    if (!this.head) return null as unknown as T;

    let current = this.head;

    while (current.getNext()) current = current.getNext() as Node<T>;

    return current.getData();
  }

  public addBefore(data: T, before: T): void {
    if (!this.head) throw new EmptyLinkedList();

    if (this.compare(this.getFirst(), before)) {
      return this.addFirst(data);
    }

    let current: Node<T> | null = this.head;

    while (current) {
      if (this.compare(current.getNext()?.getData() as T, before)) {
        const node = new Node(data);

        node.setNext(current.getNext());

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
      if (this.compare(current.getNext()?.getNext()?.getData() as T, before)) {
        const removed = current.getNext()?.getData();

        current.setNext(current.getNext()?.getNext() as Node<T>);

        this.size--;

        return removed as T;
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
        let removed = current.getNext()?.getData();

        // item is tail
        if (!removed) throw new NoSuchElement();

        current.setNext(current.getNext()?.getNext() as Node<T>);

        this.size--;

        return removed;
      }

      current = current.getNext() as Node<T>;
    }

    throw new NoSuchElement();
  }

  public find(data: T): T | null {
    if (this.isEmpty()) throw new EmptyLinkedList();

    let current = this.head;

    while (current) {
      if (this.compare(current.getData(), data)) return current.getData();

      current = current.getNext();
    }

    return null;
  }

  public remove(data: T): T | null {
    if (!this.head) throw new EmptyLinkedList();

    if (this.compare(this.head.getData(), data)) return this.removeFirst();

    let current: Node<T> | null = this.head;

    while (current && current.getNext()) {
      if (this.compare(current.getNext()?.getData() as T, data)) {
        const remove = current.getNext()?.getData() as T;

        const next = current.getNext()?.getNext() as Node<T>;

        current.setNext(next);

        this.size--;

        return remove;
      }

      current = current.getNext();
    }

    return null;
  }

  public getSize(): number {
    return this.size;
  }

  public toArray(): T[] {
    if (this.isEmpty()) return [];

    let current = this.head;

    let i = 0;

    const arr: T[] = [];

    while (current) {
      arr[i++] = current.getData();

      current = current.getNext() as Node<T>;
    }

    return arr;
  }

  public isEmpty(): boolean {
    return !this.head;
  }

  private compare(a: T, b: T) {
    if (typeof a === "object" && typeof b === "object") {
      return a.equals(b);
    } else return a === b;
  }

  public log() {
    let node = this.head;

    while (node) {
      console.log(node.getData());

      node = node.getNext();
    }
  }
}
