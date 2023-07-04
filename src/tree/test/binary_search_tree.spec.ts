import { KeyValuePair } from "../../hashtable/helper/key_value_pair";
import { BinaryTree } from "../node/binary_tree";
import { BinarySearchTree } from "../binary_search/binary_search_tree";

describe("BinarySearchTree", () => {
  let bst: BinarySearchTree<number, number> & {
    getRoot(): BinaryTree<KeyValuePair<string, number>>;
    getRootData(): number;
  };

  beforeEach(() => {
    bst = new BinarySearchTree() as any;

    // to cover more cases in tests
    bst.getRoot = function (): BinaryTree<KeyValuePair<string, number>> {
      //@ts-ignore
      return this.root as BinaryTree<KeyValuePair<string, number>>;
    };

    // to cover more cases in tests
    bst.getRootData = function (): number {
      //@ts-ignore
      return this.root?.getData().getData();
    };
  });

  describe("insert", () => {
    it("should insert the new element as a right child", () => {
      bst.insert(50, 50);

      bst.insert(70, 70);

      expect(bst.getRootData()).toBe(50);

      expect(bst.getRoot().getRight()?.getData().getData()).toBe(70);
    });

    it("should insert the new element as a left child", () => {
      bst.insert(50, 50);

      bst.insert(40, 40);

      expect(bst.getRootData()).toBe(50);

      expect(bst.getRoot().getLeft()?.getData().getData()).toBe(40);
    });

    it("should overwrite the duplicate key's value", () => {
      bst.insert(50, 50);

      bst.insert(70, 70);
      bst.insert(80, 80);

      expect(bst.get(70)).toBe(70);

      bst.insert(70, 100);

      expect(bst.get(70)).toBe(100);
    });

    it("should work correctly with multiple elements", () => {
      bst.insert(50, 50);

      bst.insert(30, 30);
      bst.insert(40, 40);

      bst.insert(70, 70);
      bst.insert(60, 60);

      expect(bst.getRootData()).toBe(50);

      expect(bst.getRoot().getLeft()?.getData().getData()).toBe(30);
      expect(bst.getRoot().getLeft()?.getRight()?.getData().getData()).toBe(40);

      expect(bst.getRoot().getRight()?.getData().getData()).toBe(70);
      expect(bst.getRoot().getRight()?.getLeft()?.getData().getData()).toBe(60);
    });
  });

  describe("get", () => {
    it("should return null", () => {
      bst.insert(5, 5);
      bst.insert(3, 3);
      bst.insert(2, 2);

      expect(bst.get(4)).toBeNull();
    });

    it("should return the element", () => {
      bst.insert(5, 5);
      bst.insert(3, 3);
      bst.insert(6, 6);

      expect(bst.get(3)).toBe(3);
    });

    it("should work correctly with multiple elements", () => {
      let arr: number[] = [];

      while (arr.length < 150) {
        const rand = Math.floor(Math.random() * 9999) + 1;

        if (arr.indexOf(rand) === -1) {
          arr.push(rand);
          bst.insert(rand, rand);
        }
      }

      for (let i = 0; i < arr.length; i++) {
        expect(bst.get(arr[i])).toBe(arr[i]);
      }
    });
  });

  describe("remove", () => {
    it("should return null", () => {
      expect(bst.remove(5)).toBe(null);
    });

    it("should return null", () => {
      bst.insert(10, 10);

      expect(bst.remove(5)).toBe(null);
    });

    it("should remove the leaf element", () => {
      bst.insert(10, 10);
      bst.insert(15, 15);
      bst.insert(20, 20);

      expect(bst.remove(20)).toBe(20);

      expect(bst.get(20)).toBeNull();

      expect(bst.getRootData()).toBe(10);
      expect(bst.getRoot().getRight()?.getData().getData()).toBe(15);
      expect(bst.getRoot().getRight()?.getRight()).toBeNull();
    });

    it("should remove the element which has only left child", () => {
      bst.insert(20, 20);
      bst.insert(15, 15);
      bst.insert(10, 10);

      expect(bst.remove(15)).toBe(15);

      expect(bst.get(15)).toBeNull();

      expect(bst.getRootData()).toBe(20);
      expect(bst.getRoot().getLeft()?.getData().getData()).toBe(10);
      expect(bst.getRoot().getLeft()?.getLeft()).toBeNull();
    });

    it("should remove the element which has only right child", () => {
      bst.insert(10, 10);
      bst.insert(15, 15);
      bst.insert(20, 20);

      expect(bst.remove(15)).toBe(15);

      expect(bst.get(15)).toBeNull();

      expect(bst.getRootData()).toBe(10);
      expect(bst.getRoot().getRight()?.getData().getData()).toBe(20);
      expect(bst.getRoot().getRight()?.getRight()).toBeNull();
    });

    it("should remove the element which has two children", () => {
      bst.insert(50, 50);
      bst.insert(30, 30);
      bst.insert(60, 60);
      bst.insert(65, 65);
      bst.insert(55, 55);

      expect(bst.remove(50)).toBe(50);

      expect(bst.get(50)).toBeNull();

      expect(bst.getRootData()).toBe(55);
      expect(bst.getRoot().getRight()?.getData().getData()).toBe(60);
      expect(bst.getRoot().getRight()?.getRight()?.getData().getData()).toBe(
        65
      );
      expect(bst.getRoot().getLeft()?.getData().getData()).toBe(30);
    });

    it("should work correctly with multiple elements", () => {
      let arr: number[] = [];

      while (arr.length < 200) {
        const rand = Math.floor(Math.random() * 9999) + 1;

        if (arr.indexOf(rand) === -1) {
          arr.push(rand);
          bst.insert(rand, rand);
        }
      }

      while (arr.length !== 0) {
        const rand = arr[Math.floor(Math.random() * arr.length)];

        expect(bst.remove(rand)).toBe(rand);

        arr = arr.filter((v) => v != rand);
      }

      expect(bst.getRoot()).toBeNull();
    });
  });

  describe("min", () => {
    it("should return null", () => {
      expect(bst.min()).toBeNull();
    });

    it("should return the minimum value", () => {
      bst.insert(55, 55);
      bst.insert(56, 56);
      bst.insert(43, 43);
      bst.insert(57, 57);
      bst.insert(58, 58);

      expect(bst.min()).toBe(43);
    });
  });

  describe("max", () => {
    it("should return null", () => {
      expect(bst.max()).toBeNull();
    });

    it("should return the maximum value", () => {
      bst.insert(55, 55);
      bst.insert(54, 54);
      bst.insert(60, 60);
      bst.insert(53, 53);
      bst.insert(52, 52);

      expect(bst.max()).toBe(60);
    });
  });

  describe("toArray", () => {
    it("should return the array as sorted", () => {
      const arr: number[] = [];

      while (arr.length < 100) {
        const random = Math.floor(Math.random() * 1000);

        if (!arr.includes(random)) {
          arr.push(random);
          bst.insert(random, random);
        }
      }

      const sorted = arr.sort((a, b) => a - b);

      expect(bst.toArray()).toStrictEqual(sorted);
    });
  });
});
