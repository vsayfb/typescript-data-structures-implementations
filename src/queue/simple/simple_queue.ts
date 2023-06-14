import { NoSuchElement } from "../../errors/no_such_element";
import { HasEqualMethod } from "../../interfaces/has_equal_method";
import { FullQueue } from "../errors/full_queue";
import { QueueInterface } from "../interfaces/queue";

export class Queue<T extends HasEqualMethod<T> | number | string | boolean>
  implements QueueInterface<T>
{
  private front: number = 0;
  private back: number = 0;
  private queue: T[] = [];

  constructor(capacity?: number) {
    this.queue = new Array<T>(capacity || 10);
  }

  enqueue(data: T): void {
    if (this.back === this.queue.length) {
      const queue = [...this.queue];

      queue.length = this.queue.length * 2;

      this.queue = queue;
    }

    this.queue[this.back++] = data;
  }

  dequeue(): T {
    if (this.isEmpty()) throw new NoSuchElement();

    const removed = this.queue[this.front];

    this.queue[this.front++] = undefined as unknown as T;

    if (this.isEmpty()) {
      this.front = 0;
      this.back = 0;
    }

    return removed;
  }

  peek(): T {
    if (this.isEmpty()) throw new NoSuchElement();

    return this.queue[this.front];
  }

  rear(): T {
    if (this.isEmpty()) throw new NoSuchElement();

    return this.queue[this.back - 1];
  }

  isEmpty(): boolean {
    return this.front === this.back;
  }

  getSize(): number {
    return this.back - this.front;
  }

  getCapacity(): number {
    return this.queue.length;
  }
}
