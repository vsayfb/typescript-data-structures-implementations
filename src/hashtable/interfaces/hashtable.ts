export interface HashTableImpl<K, T> {
  put(key: K, data: T): void;
  remove(key: K): T;
  get(key: K): T;
}
