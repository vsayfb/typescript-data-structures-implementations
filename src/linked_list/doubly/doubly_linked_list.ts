import { EmptyLinkedList } from "../errors/empty_linked_list";
import { NoSuchElement } from "../../errors/no_such_element";
import { HasEqualMethod } from "../../interfaces/has_equal_method";
import { LinkedListInterface } from "../interfaces/linked_list";
import { LinkedList } from "../base/linked_list";
import { Node } from "./node";

export class DoublyLinkedList<
    T extends HasEqualMethod<T> | number | string | boolean
  >
  extends LinkedList<T, Node<T>>
  implements LinkedListInterface<T>
{
  private tail: Node<T> | null = null;

  public constructor() {
    super();
  }

  public addFirst(data: T): void {
    const node = new Node(data);

    if (this.head) {
      this.head.setPrevious(node);
    } else {
      this.tail = node;
    }

    node.setNext(this.head);

    this.head = node;

    this.size++;
  }

  public removeFirst(): T {
    if (!this.head) throw new EmptyLinkedList();

    const next = this.head.getNext();

    this.size--;

    const removed = this.head.getData();

    if (next === null) {
      this.head = null;
      this.tail = null;

      return removed;
    }

    this.head = next;

    return removed;
  }

  public addLast(data: T): void {
    if (this.isEmpty()) {
      return this.addFirst(data);
    }

    const node = new Node(data);

    const currentTail = this.tail;

    if (currentTail) currentTail.setNext(node);

    node.setPrevious(currentTail);

    this.tail = node;

    this.size++;
  }

  public removeLast(): T {
    if (!this.tail) throw new EmptyLinkedList();

    const removed = this.tail.getData();

    if (this.tail.getPrevious()) {
      this.tail.getPrevious()?.setNext(null);
      this.tail = this.tail.getPrevious();
    } else {
      this.head = null;
      this.tail = null;
    }

    this.size--;

    return removed;
  }

  public getFirst(): T {
    return this.head ? this.head.getData() : (null as unknown as T);
  }

  public getLast(): T {
    return this.tail ? this.tail.getData() : (null as unknown as T);
  }

  public addBefore(data: T, before: T): void {
    if (this.isEmpty()) throw new EmptyLinkedList();

    let current = this.head;

    while (current) {
      if (this.compare(current.getData(), before)) {
        const node = new Node(data);

        const currentPrevious = current.getPrevious();

        if (!currentPrevious) return this.addFirst(data);

        currentPrevious.setNext(node);

        node.setPrevious(currentPrevious);

        node.setNext(current);

        current.setPrevious(node);

        this.size++;

        return;
      }

      current = current.getNext();
    }

    throw new NoSuchElement();
  }

  public removeBefore(before: T): T {
    if (this.isEmpty()) throw new EmptyLinkedList();

    let current = this.head;

    while (current) {
      if (this.compare(current.getData(), before)) {
        const currentPrevious = current.getPrevious();

        if (!currentPrevious) break;

        const currentPreviousPrevious = currentPrevious.getPrevious();

        if (!currentPreviousPrevious) return this.removeFirst();

        currentPreviousPrevious.setNext(current);

        current.setPrevious(currentPreviousPrevious);

        this.size--;

        return currentPrevious.getData();
      }

      current = current.getNext();
    }

    throw new NoSuchElement();
  }

  public addAfter(data: T, after: T): void {
    if (this.isEmpty()) throw new EmptyLinkedList();

    let current = this.head;

    while (current) {
      if (this.compare(current.getData(), after)) {
        const node = new Node(data);

        const currentNext = current.getNext();

        if (!currentNext) return this.addLast(data);

        node.setPrevious(current);

        node.setNext(currentNext);

        current.setNext(node);

        currentNext.setPrevious(node);

        return;
      }

      current = current.getNext();
    }

    throw new NoSuchElement();
  }

  public removeAfter(after: T): T {
    if (this.isEmpty()) throw new EmptyLinkedList();

    let current = this.head;

    while (current) {
      if (this.compare(current.getData(), after)) {
        const currentNext = current.getNext();

        if (!currentNext) break;

        const currentNextNext = currentNext.getNext();

        if (!currentNextNext) return this.removeLast();

        current.setNext(currentNextNext);

        currentNextNext.setPrevious(current);

        this.size--;

        return currentNext.getData();
      }

      current = current.getNext();
    }

    throw new NoSuchElement();
  }

  public remove(data: T): T | null {
    throw new Error("Method not implemented.");
  }

  public isEmpty(): boolean {
    return this.head === null;
  }
}
