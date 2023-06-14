import { NoSuchElement } from "../../errors/no_such_element";
import { QueueInterface } from "../interfaces/queue";

export class CircularQueue<T> implements QueueInterface<T> {
  private front: number = 0;
  private back: number = 0;
  private queue: T[] = [];

  constructor(capacity?: number) {
    this.queue = new Array<T>(capacity || 10);
  }

  enqueue(data: T): void {
    if (this.getSize() === this.getCapacity() - 1) {
      const size = this.getSize();
      const capacity = this.getCapacity();
      const queue = new Array<T>(capacity * 2);
      const until = capacity - this.front;

      for (let i = 0; i < until; i++) {
        queue[i] = this.queue[this.front + i];
      }

      for (let k = 0, i = until; i < capacity; i++) {
        queue[i] = this.queue[k++];
      }

      this.queue = queue;
      this.front = 0;
      this.back = size;
    }

    this.queue[this.back] = data;

    if (this.back < this.getCapacity() - 1) this.back++;
    else this.back = 0;
  }

  dequeue(): T {
    if (this.isEmpty()) throw new NoSuchElement();

    let removed = this.queue[this.front];

    this.queue[this.front++] = undefined as T;

    if (this.isEmpty()) {
      this.front = 0;
      this.back = 0;
    } else if (this.front === this.getCapacity()) {
      this.front = 0;
    }

    return removed;
  }

  peek(): T {
    if (this.isEmpty()) throw new NoSuchElement();

    return this.queue[this.front];
  }

  rear(): T {
    if (this.isEmpty()) throw new NoSuchElement();

    if (this.isWrapped())
      return this.back === 0
        ? this.queue[this.getCapacity() - 1]
        : this.queue[this.back - 1];

    return this.queue[this.back - 1];
  }

  isEmpty(): boolean {
    return this.back === this.front;
  }

  getSize(): number {
    if (this.isWrapped()) return this.back - this.front + this.getCapacity();

    return this.back - this.front;
  }

  getCapacity(): number {
    return this.queue.length;
  }

  private isWrapped(): boolean {
    return this.back < this.front;
  }
}
