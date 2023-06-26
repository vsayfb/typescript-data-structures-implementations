import { SinglyLinkedList } from "../../linked_list/singly/singly_linked_list";
import { ChainedHashTable } from "../chained/hashtable";
import { KeyValuePair } from "../helper/key_value_pair";

describe("ChainedHashtable (Chaining)", () => {
  let ht: ChainedHashTable<string, number> & {
    getList(): (SinglyLinkedList<KeyValuePair<any, number>> | undefined)[];
  };

  beforeEach(() => {
    ht = new ChainedHashTable(5) as any;

    // to cover more cases in test
    ht.getList = function () {
      //@ts-ignore
      return this.hashtable.map((l) => (l.isEmpty() ? undefined : l));
    };
  });

  describe("put", () => {
    it("should add the element to the hashed index in the list", () => {
      ht.put("o", 1);

      expect(ht.get("o")).toBe(1);

      expect(ht.getList()[1]?.getFirst()?.getData()).toBe(1);
      expect(ht.getList()[1]?.getFirst()?.getKey()).toBe("o");

      expect(ht.toArray()).toEqual([1]);
    });

    it("should handle collisions and add elements to the same list", () => {
      ht.put("o", 1);
      ht.put("c", 2);

      expect(ht.get("o")).toBe(1);

      expect(ht.getList()[1]?.getFirst()?.getData()).toBe(1);
      expect(ht.getList()[1]?.getFirst()?.getKey()).toBe("o");

      expect(ht.getList()[1]?.getLast()?.getData()).toBe(2);
      expect(ht.getList()[1]?.getLast()?.getKey()).toBe("c");

      expect(ht.toArray()).toEqual([1, 2]);
    });
  });

  describe("remove", () => {
    it("should return the removed item item with the provided key", () => {
      ht.put("o", 1);
      ht.put("oo", 2);

      expect(ht.remove("oo")).toBe(2);
    });

    it("should handle collisions and return the removed element", () => {
      ht.put("bb", 1);
      ht.put("oo", 2);

      expect(ht.remove("oo")).toBe(2);
    });
  });

  describe("get", () => {
    it("should return the correct element with the provided key", () => {
      ht.put("o", 1);
      ht.put("oo", 2);

      expect(ht.get("oo")).toBe(2);
    });

    it("should handle collisions and return the correct element", () => {
      ht.put("bb", 1);
      ht.put("oo", 2);
      ht.put("cc", 3);

      expect(ht.get("oo")).toBe(2);
    });
  });
});
