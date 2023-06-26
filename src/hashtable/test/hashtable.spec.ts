import { NoSuchElement } from "../../errors/no_such_element";
import { HashTable } from "../regular/hashtable";

describe("Hashtable (Linear Probing)", () => {
  let ht: HashTable<number, string>;

  beforeEach(() => {
    ht = new HashTable(5);

    //to cover more cases in test
    ht.toArray = function () {
      //@ts-ignore
      return this.table.map((e) => e?.getData());
    };
  });

  describe("put", () => {
    it("should add key-value pairs to the hash table", () => {
      ht.put(1, "1");
      ht.put(2, "2");
      ht.put(3, "3");

      expect(ht.get(1)).toEqual("1");
      expect(ht.get(2)).toEqual("2");
      expect(ht.get(3)).toEqual("3");
    });

    it("should overwrite existing value if key already exists", () => {
      ht.put(1, "1");
      expect(ht.get(1)).toEqual("1");

      ht.put(1, "New 1");
      expect(ht.get(1)).toEqual("New 1");
    });

    it("should handle collisions and resolve them correctly", () => {
      // Force collisions for keys 1 and 11
      ht.put(1, "1");
      ht.put(6, "6");
      ht.put(11, "11");

      expect(ht.get(1)).toEqual("1");
      expect(ht.get(6)).toEqual("6");
      expect(ht.get(11)).toEqual("11");
    });

    it("should resize the hash table when it reaches its capacity", () => {
      for (let i = 0; i < 5; i++) {
        ht.put(i, `${i}`);
      }

      expect(ht.get(0)).toEqual("0");
      expect(ht.get(4)).toEqual("4");

      expect(ht.toArray()).toStrictEqual(["0", "1", "2", "3", "4"]);

      ht.put(5, "5");

      expect(ht.toArray()).toStrictEqual([
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        ,
        ,
        ,
        ,
      ]);
    });
  });

  describe("remove", () => {
    it("should throw an error if key does not exist", () => {
      expect(() => ht.remove(1)).toThrowError(NoSuchElement);
    });

    it("should rehash the hash table after removing a key-value pair", () => {
      ht.put(1, "1");
      ht.put(11, "11");
      ht.put(22, "22");

      let arr = ht.toArray();

      expect(arr).toStrictEqual([, "1", "11", "22", ,]);

      const rehash = jest.spyOn(HashTable.prototype as any, "rehash");

      ht.remove(11);

      expect(rehash).toHaveBeenCalledTimes(1);

      arr = ht.toArray();

      expect(arr).toStrictEqual([, "1", "22", , ,]);

      rehash.mockRestore();
    });

    it("should return the removed element in collision", () => {
      ht.put(1, "1");
      ht.put(6, "6");
      ht.put(11, "11");

      expect(ht.remove(6)).toBe("6");
    });
  });

  describe("get", () => {
    it("should throw an error if key does not exist", () => {
      expect(() => ht.get(1)).toThrowError(NoSuchElement);
    });

    it("should retrieve values from the hash table", () => {
      ht.put(1, "1");
      ht.put(2, "2");
      ht.put(3, "3");

      expect(ht.get(1)).toEqual("1");
      expect(ht.get(2)).toEqual("2");
      expect(ht.get(3)).toEqual("3");
    });

    it("should handle collisions and retrieve values correctly", () => {
      ht.put(1, "1");
      ht.put(6, "6");
      ht.put(11, "11");

      expect(ht.get(1)).toEqual("1");
      expect(ht.get(6)).toEqual("6");
      expect(ht.get(11)).toEqual("11");
    });

    it("should retrieve updated values after overwriting", () => {
      ht.put(1, "1");
      expect(ht.get(1)).toEqual("1");

      ht.put(1, "New 1");
      expect(ht.get(1)).toEqual("New 1");
    });
  });

  // private function
  describe("findIndexOfKey", () => {
    it("should find keys in the hash table", () => {
      //@ts-ignore
      let findIndexOfKey = (k) => ht.findIndexOfKey(k);

      ht.put(1, "1");
      ht.put(2, "2");
      ht.put(3, "3");

      expect(findIndexOfKey(1)).toEqual(1);
      expect(findIndexOfKey(2)).toEqual(2);
      expect(findIndexOfKey(3)).toEqual(3);
    });

    it("should return -1 if key does not exist", () => {
      //@ts-ignore
      let findIndexOfKey = (k) => ht.findIndexOfKey(k);

      expect(findIndexOfKey(1)).toEqual(-1);
    });

    it("should handle collisions and find indexes correctly", () => {
      //@ts-ignore
      let findIndexOfKey = (k) => ht.findIndexOfKey(k);

      ht.put(1, "1");
      ht.put(6, "6");
      ht.put(11, "11");

      expect(findIndexOfKey(1)).toEqual(1);
      expect(findIndexOfKey(6)).toEqual(2);
      expect(findIndexOfKey(11)).toEqual(3);
    });
  });

  //-> private function
  describe("findOpenSlot", () => {
    it("should handle collisions and find open slot correctly", () => {
      ht.put(1, "1");
      ht.put(6, "6");

      //@ts-ignore
      expect(ht.findOpenSlot(ht.hash(11))).toEqual(3);
    });
  });

  //-> private function
  describe("probe", () => {
    it("should wrap if (arg + 1) is equal the length of the array", () => {
      //@ts-ignore -> private function
      expect(ht.probe(4)).toBe(0);
    });
  });
});
