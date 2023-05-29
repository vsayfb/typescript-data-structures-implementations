export interface LinkedListInterface<T> {
  addFirst(data: T): void;
  removeFirst(): T;
  addLast(data: T): void;
  removeLast(): T;
  getFirst(): T | null;
  getLast(): T;
  addBefore(data: T, before: T): void;
  removeBefore(before: T): T;
  addAfter(data: T, after: T): void;
  removeAfter(after: T): T;
  find(data: T): T | null;
  remove(data: T): T | null;
  toArray(): T[];
  isEmpty(): boolean;
  getSize(): number;
}
