export interface QueueInterface<T> {
  enqueue(data: T): void;
  dequeue(): T;
  peek(): T;
  rear(): T;
}
