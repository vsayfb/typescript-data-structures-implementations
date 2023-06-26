import { NoSuchElement } from "../../errors/no_such_element";
import { HashTableImpl } from "../interfaces/hashtable";
import { KeyValuePair } from "../helper/key_value_pair";

export class HashTable<K extends string | number, T>
  implements HashTableImpl<K, T>
{
  private table: KeyValuePair<K, T>[] = [];

  constructor(capacity?: number) {
    this.table = new Array(capacity || 10);
  }

  put(key: K, data: T): void {
    let hashedIndex = this.hash(key);

    // the key already exists
    if (
      this.table[hashedIndex] != null &&
      this.table[hashedIndex].equals(key)
    ) {
      this.table[hashedIndex].setData(data);
      return;
    }

    if (this.occupied(hashedIndex)) {
      hashedIndex = this.findOpenSlot(hashedIndex);

      // array is full
      if (this.occupied(hashedIndex)) {
        this.resize();

        // array is resized but slot is occupied
        if (this.occupied(hashedIndex))
          hashedIndex = this.findOpenSlot(hashedIndex);
      }
    }

    this.table[hashedIndex] = new KeyValuePair<K, T>(key, data);
  }

  remove(key: K): T {
    let hashedIndex = this.findIndexOfKey(key);

    if (hashedIndex === -1) throw new NoSuchElement();

    const removed = this.table[hashedIndex].getData();

    this.table[hashedIndex] = null as any;

    const oldTable = this.table;

    this.table = new Array(oldTable.length);

    this.rehash(oldTable);

    return removed;
  }

  get(key: K): T {
    let hashedIndex = this.findIndexOfKey(key);

    if (hashedIndex !== -1) return this.table[hashedIndex].getData();

    throw new NoSuchElement();
  }

  toArray(): T[] {
    const arr = [];

    for (let i = 0; i < this.table.length; i++) {
      const element = this.table[i];

      if (element != null) arr.push(element.getData());
    }

    return arr;
  }

  private findIndexOfKey(key: K): number {
    let hashedIndex = this.hash(key);

    const found = this.table[hashedIndex];

    if (found != null && found.equals(key)) return hashedIndex;

    const currentIndex = hashedIndex;

    if (hashedIndex < this.table.length - 1) hashedIndex++;
    else hashedIndex = 0;

    while (
      currentIndex != hashedIndex &&
      this.table[hashedIndex] != null &&
      !this.table[hashedIndex].equals(key)
    ) {
      hashedIndex = this.probe(hashedIndex);
    }

    if (
      this.table[hashedIndex] != null &&
      this.table[hashedIndex].equals(key)
    ) {
      return hashedIndex;
    }

    return -1;
  }

  private findOpenSlot(hashedIndex: number) {
    const currentIndex = hashedIndex;

    if (hashedIndex < this.table.length - 1) hashedIndex++;
    else hashedIndex = 0;

    if (hashedIndex == 0) {
      console.log(hashedIndex);
    }

    while (this.occupied(hashedIndex) && currentIndex != hashedIndex) {
      hashedIndex = this.probe(hashedIndex);
    }

    return hashedIndex;
  }

  private occupied(index: number): boolean {
    return this.table[index] != null;
  }

  private hash(key: K): number {
    if (typeof key === "string") return key.length % this.table.length;

    return +key % this.table.length;
  }

  private rehash(oldTable: KeyValuePair<K, T>[]): void {
    for (let i = 0; i < oldTable.length; i++) {
      const elem = oldTable[i];

      if (elem != null) this.put(elem.getKey(), elem.getData());
    }
  }

  private resize(): void {
    const oldTable = this.table;

    this.table = new Array(oldTable.length * 2);

    this.rehash(oldTable);
  }

  private probe(hashedIndex: number): number {
    return (hashedIndex + 1) % this.table.length;
  }
}
