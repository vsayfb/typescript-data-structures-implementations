import { HasEqualMethod } from "../../interfaces/has_equal_method";

export class KeyValuePair<K extends string | number, T>
  implements HasEqualMethod<K>
{
  constructor(private key: K, private data: T) {}

  public getKey(): K {
    return this.key;
  }

  public getData(): T {
    return this.data;
  }

  public setData(data: T): void {
    this.data = data;
  }

  equals(key: KeyValuePair<K, T> | string | number): boolean {
    if (typeof key === "string" || typeof key === "number")
      return this.key === key;

    return this.key === key.key;
  }
}
