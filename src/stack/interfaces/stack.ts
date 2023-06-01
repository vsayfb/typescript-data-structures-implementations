export interface StackInterface<T> {
  push(data: T): void;
  pop(): T;
  peek(): T | null;
  isEmpty(): boolean;
  getSize(): number;
}
