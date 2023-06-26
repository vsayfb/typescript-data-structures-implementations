import { NoSuchElement } from "../../errors/no_such_element";
import { SinglyLinkedList } from "../../linked_list/singly/singly_linked_list";
import { HashTableImpl } from "../interfaces/hashtable";
import { KeyValuePair } from "../helper/key_value_pair";

export class ChainedHashTable<K extends string | number, T>
  implements HashTableImpl<K, T>
{
  private hashtable: SinglyLinkedList<KeyValuePair<any, T>>[] = [];

  constructor(capacity?: number) {
    const until = capacity || 10;

    for (let i = 0; i < until; i++) {
      this.hashtable[i] = new SinglyLinkedList<KeyValuePair<any, T>>();
    }
  }

  put(key: K, data: T): void {
    const hash = this.hash(key);

    const elem = new KeyValuePair<K, T>(key, data);

    this.hashtable[hash].addLast(elem);
  }

  remove(key: K): T {
    const hash = this.hash(key);

    const list = this.hashtable[hash];

    const elem = new KeyValuePair<K, T>(key, {} as any);

    try {
      // it may throw EmptyLinkedList
      const removed = list.remove(elem);

      if (removed) return removed.getData();

      throw new NoSuchElement();
    } catch (error: unknown) {
      throw new NoSuchElement();
    }
  }

  get(key: K): T {
    const hash = this.hash(key);

    const list = this.hashtable[hash];

    const elem = new KeyValuePair<K, T>(key, {} as any);

    try {
      const data = list.find(elem);

      if (data) return data.getData();

      throw new NoSuchElement();
    } catch (error) {
      throw new NoSuchElement();
    }
  }

  private hash(key: K): number {
    if (typeof key === "string") return key.length % this.hashtable.length;

    return +key % this.hashtable.length;
  }

  toArray(): T[] {
    const arr: T[] = [];

    this.hashtable.map(
      (l) => !l.isEmpty() && l.toArray().map((i) => arr.push(i.getData()))
    );

    return arr;
  }
}
