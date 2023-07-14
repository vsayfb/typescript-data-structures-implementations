import { KeyValuePair } from "../../hashtable/helper/key_value_pair";

export class MaxHeap<K extends string | number, T> {
  private heap: KeyValuePair<K, T>[];

  private size: number = 0;

  private static DEFAULT_CAPACITY: number = 10;

  constructor(capacity?: number) {
    this.heap = new Array(capacity || MaxHeap.DEFAULT_CAPACITY);
  }

  insert(key: K, data: T): void {
    const node = new KeyValuePair(key, data);

    this.heap[this.size] = node;

    this.heapifyUp(this.size++);

    if (this.isFull()) this.heap.length *= 2;
  }

  remove(key: K): T | null {
    if (this.isEmpty()) return null;

    const found = this.find(key);

    if (found == -1) return null;

    const removed = this.heap[found];

    if (found == this.size - 1) {
      this.heap[found] = null as unknown as KeyValuePair<K, T>;

      this.size--;

      if (this.isEmpty()) this.reset();

      return removed.getData();
    }

    this.swap(found, this.size - 1);

    this.heap[this.size - 1] = null as unknown as KeyValuePair<K, T>;

    let parent = this.heap[this.getParentIndex(found)];

    if (parent != null && this.heap[found].getKey() > parent.getKey()) {
      this.heapifyUp(found);
    } else {
      this.heapifyDown(found);
    }

    this.size--;

    if (this.isEmpty()) this.reset();

    return removed.getData();
  }

  pull(): T | null {
    if (this.isEmpty()) return null;

    const removed = this.heap[0];

    this.swap(0, this.size - 1);

    this.heap[this.size - 1] = null as unknown as KeyValuePair<K, T>;

    this.size--;

    if (this.peek() == null) {
      this.reset();

      return removed.getData();
    }

    this.heapifyDown(0);

    return removed.getData();
  }

  peek(): T | null {
    if (this.isEmpty()) return null;

    return this.heap[0].getData();
  }

  toArray(): T[] {
    const result: T[] = [];

    for (let i = 0; i < this.size; i++) {
      result.push(this.heap[i].getData());
    }

    return result;
  }

  getSize(): number {
    return this.size;
  }

  isFull(): boolean {
    return this.size == this.heap.length;
  }

  isEmpty(): boolean {
    return this.size == 0;
  }

  private heapifyUp(index: number): void {
    while (
      index > 0 &&
      this.heap[this.getParentIndex(index)] != null &&
      this.heap[index].getKey() > this.heap[this.getParentIndex(index)].getKey()
    ) {
      let parent = this.getParentIndex(index);

      this.swap(index, parent);

      index = parent;
    }
  }

  private heapifyDown(index: number): void {
    let current = index;

    while (true) {
      const left = this.getLeftChildIndex(current);
      const right = this.getRightChildIndex(current);

      let largest = current;

      if (
        left < this.size &&
        this.heap[left]?.getKey() > this.heap[largest].getKey()
      ) {
        largest = left;
      }

      if (
        right < this.size &&
        this.heap[right]?.getKey() > this.heap[largest].getKey()
      ) {
        largest = right;
      }

      if (largest === current) {
        break;
      }

      this.swap(current, largest);

      current = largest;
    }
  }

  private find(key: K): number {
    return this.heap.findIndex((v) => v.getKey() == key);
  }

  private getParentIndex(i: number): number {
    return Math.floor((i - 1) / 2);
  }

  private getLeftChildIndex(i: number): number {
    return 2 * i + 1;
  }

  private getRightChildIndex(i: number): number {
    return 2 * i + 2;
  }

  private swap(firstIndex: number, secondIndex: number) {
    const temp = this.heap[firstIndex];

    this.heap[firstIndex] = this.heap[secondIndex];

    this.heap[secondIndex] = temp;
  }

  private reset(): void {
    this.heap = new Array(MaxHeap.DEFAULT_CAPACITY);
  }
}
