import { DoublyLinkedList } from "../doubly/doubly_linked_list";
import { Node } from "../doubly/node";

describe("LinkedList", () => {
  let list: DoublyLinkedList<number> & {
    getHead(): Node<number>;
    getTail(): Node<number>;
  };

  beforeEach(() => {
    list = new DoublyLinkedList<number>() as any;

    // to cover more cases in tests
    list.getHead = function () {
      //@ts-ignore -> private field
      return this.head as Node<T>;
    };

    // to cover more cases in tests
    list.getTail = function () {
      //@ts-ignore -> private field
      return this.tail as Node<T>;
    };
  });

  describe("find", () => {
    it("should return null if item does not exist", () => {
      list.addFirst(1);
      list.addFirst(2);
      list.addFirst(3);

      expect(list.find(4)).toBeNull();
    });

    it("should return the item if item exists in list", () => {
      list.addFirst(1);
      list.addFirst(2);
      list.addFirst(3);

      expect(list.find(3)).toBe(3);
    });
  });

  describe("toArray", () => {
    it("should throw an error of an empty list", () => {
      expect(list.toArray()).toStrictEqual([]);
    });

    it("should return an array in a non-empty list", () => {
      list.addFirst(1);
      list.addFirst(3);
      list.addLast(2);

      expect(list.toArray()).toStrictEqual([3, 1, 2]);
    });
  });

  describe("getSize", () => {
    it("should return size", () => {
      expect(list.getSize()).toBe(0);
      list.addFirst(0);
      expect(list.getSize()).toBe(1);
      list.addLast(1);
      expect(list.getSize()).toBe(2);
      list.addAfter(2, 1);
      expect(list.getSize()).toBe(3);
      list.addBefore(3, 2);
      expect(list.getSize()).toBe(4);
    });
  });

  describe("getFirst", () => {
    it("should return null in an empty list", () => {
      expect(list.getFirst()).toBeNull();
    });

    it("should return the first item added to the list", () => {
      list.addFirst(3);
      list.addLast(1);
      list.addLast(2);

      expect(list.getFirst()).toBe(3);
    });
  });
});
