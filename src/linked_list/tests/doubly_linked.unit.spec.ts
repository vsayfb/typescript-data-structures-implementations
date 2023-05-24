import { EmptyLinkedList } from "../../errors/empty_linked_list";
import { NoSuchElement } from "../../errors/no_such_element";
import { DoublyLinkedList } from "../doubly/doubly_linked_list";
import { Node } from "../doubly/node";

describe("DoublyLinkedList", () => {
  let list: DoublyLinkedList<number> & {
    getHead(): Node<number> | null;
    getTail(): Node<number> | null;
  };

  beforeEach(() => {
    list = new DoublyLinkedList() as any;

    // to cover more cases in test
    list.getHead = function () {
      //@ts-ignore -> private method
      return this.head || null;
    };

    // to cover more cases in test
    list.getTail = function () {
      //@ts-ignore -> private method
      return this.tail || null;
    };
  });

  describe("addFirst", () => {
    it("should add a new item to the beginning of an empty list", () => {
      list.addFirst(1);

      expect(list.getFirst()).toBe(1);
      expect(list.getHead()?.getNext()).toBeNull();
      expect(list.getHead()?.getPrevious()).toBeNull();
    });

    it("should add a new item as a head and tail to the beginning of an empty list", () => {
      list.addFirst(1);

      expect(list.getFirst()).toBe(1);
      expect(list.getLast()).toBe(1);

      expect(list.getHead()).toEqual(list.getTail());
    });

    it("should update the next and previous pointer after adding a new item to the beginning of a list", () => {
      list.addFirst(1);
      list.addFirst(2);

      expect(list.getHead()?.getData()).toBe(2);
      expect(list.getHead()?.getPrevious()).toBeNull();
      expect(list.getHead()?.getNext()?.getData()).toBe(1);
      expect(list.getHead()?.getNext()?.getPrevious()?.getData()).toBe(2);
    });

    it("should add multiple items correctly", () => {
      for (let i = 0; i < 1000; i++) list.addFirst(i);

      expect(list.getFirst()).toBe(999);
      expect(list.getLast()).toBe(0);
      expect(list.getSize()).toBe(1000);
    });
  });

  describe("removeFirst", () => {
    it("should throw an error of an empty list", () => {
      expect(() => list.removeFirst()).toThrowError();
    });

    it("should remove the item and set null to head and tail in a single-element list", () => {
      list.addFirst(1);

      expect(list.removeFirst()).toBe(1);
      expect(list.getHead()).toBeNull();
      expect(list.getTail()).toBeNull();
    });

    it("should set new item as head in a list", () => {
      list.addFirst(1);
      list.addFirst(2);
      list.addFirst(3);

      expect(list.removeFirst()).toBe(3);
      expect(list.getFirst()).toBe(2);
      expect(list.getHead()?.getNext()?.getData()).toBe(1);
    });

    it("should correctly remove multiple items", () => {
      for (let i = 0; i < 1000; i++) list.addFirst(i);

      for (let i = 999; i >= 0; i--) expect(list.removeFirst()).toBe(i);

      expect(list.getHead()).toBeNull();
      expect(list.getTail()).toBeNull();
      expect(list.getFirst()).toBeNull();
      expect(list.getLast()).toBeNull();
      expect(list.getSize()).toBe(0);
    });
  });

  describe("addLast", () => {
    it("should call and add new item as head and tail in an empty list", () => {
      const spy = jest.spyOn(list, "addFirst");

      list.addLast(1);

      expect(spy).toHaveBeenCalledWith(1);

      expect(list.getLast()).toBe(1);
      expect(list.getFirst()).toBe(1);

      spy.mockReset();
    });

    it("should set previous and next pointers as null in an empty list", () => {
      list.addLast(1);

      expect(list.getHead()?.getNext()).toBeNull();
      expect(list.getTail()?.getPrevious()).toBeNull();
    });

    it("should set previous and next pointers", () => {
      list.addLast(1);
      list.addLast(2);
      list.addLast(3);

      expect(list.getTail()?.getNext()).toBeNull();
      expect(list.getTail()?.getPrevious()?.getData()).toBe(2);
      expect(list.getTail()?.getPrevious()?.getPrevious()?.getData()).toBe(1);

      expect(list.getHead()?.getPrevious()).toBeNull();
      expect(list.getHead()?.getNext()?.getData()).toBe(2);
      expect(list.getHead()?.getNext()?.getNext()?.getData()).toBe(3);
    });

    it("should correctly add multiple items", () => {
      for (let i = 0; i < 1000; i++) list.addLast(i);

      expect(list.getLast()).toBe(999);
      expect(list.getSize()).toBe(1000);
      expect(list.getFirst()).toBe(0);
    });
  });

  describe("removeLast", () => {
    it("should throw an error of an empty list", () => {
      expect(() => list.removeLast()).toThrowError();
    });

    it("should remove the item and set null to head and tail in a single-element list", () => {
      list.addLast(1);

      expect(list.removeFirst()).toBe(1);
      expect(list.getHead()).toBeNull();
      expect(list.getTail()).toBeNull();
    });

    it("should remove and set new tail", () => {
      list.addLast(1);
      list.addLast(2);
      list.addLast(3);

      expect(list.getTail()?.getData()).toBe(3);

      expect(list.removeLast()).toBe(3);

      expect(list.getTail()?.getPrevious()?.getData()).toBe(1);
      expect(list.getTail()?.getNext()).toBeNull();

      expect(list.removeLast()).toBe(2);

      expect(list.getTail()?.getPrevious()).toBeNull();
    });

    it("should correctly remove multiple items", () => {
      for (let i = 0; i < 1000; i++) list.addLast(i);

      for (let i = 999; i >= 0; i--) expect(list.removeLast()).toBe(i);

      expect(list.getHead()).toBeNull();
      expect(list.getTail()).toBeNull();
      expect(list.getFirst()).toBeNull();
      expect(list.getLast()).toBeNull();
      expect(list.getSize()).toBe(0);
    });
  });

  describe("getFirst", () => {
    it("should return null in an empty list", () => {
      expect(list.getFirst()).toBeNull();
    });

    it("should return item that beginning of the list", () => {
      list.addFirst(1);
      list.addFirst(2);
      list.addFirst(3);

      expect(list.getFirst()).toBe(3);
    });
  });

  describe("getLast", () => {
    it("should return null in an empty list", () => {
      expect(list.getLast()).toBeNull();
    });

    it("should return item that end of the list", () => {
      list.addLast(1);
      list.addLast(2);
      list.addLast(3);

      expect(list.getLast()).toBe(3);
    });
  });

  describe("addBefore", () => {
    it("should throw an error of empty list", () => {
      expect(() => list.addBefore(1, 2)).toThrowError(EmptyLinkedList);
    });

    it("should throw an error if there is no item that received", () => {
      list.addFirst(3);

      expect(() => list.addBefore(1, 2)).toThrowError(NoSuchElement);
    });

    it("should call addFirst method and add new item as head of a single-element list", () => {
      list.addFirst(2);

      const spy = jest.spyOn(list, "addFirst");

      list.addBefore(1, 2);

      expect(spy).toHaveBeenCalledWith(1);

      expect(list.getFirst()).toBe(1);

      expect(list.getHead()?.getNext()?.getData()).toBe(2);

      spy.mockReset();
    });

    it("should correctly works with multiple items", () => {
      list.addFirst(0);

      for (let i = 0, j = 1; i < 1000; i++, j++) list.addBefore(j, i);

      expect(list.getLast()).toBe(0);
      expect(list.getSize()).toBe(1001);
      expect(list.getFirst()).toBe(1000);

      list.toArray().map((i) => expect(list.find(i)).toBe(i));

      expect(list.toArray()).toStrictEqual([...Array(1001).keys()].reverse());
    });
  });

  describe("removeBefore", () => {
    it("should throw an error of an empty list", () => {
      expect(() => list.removeBefore(2)).toThrowError(EmptyLinkedList);
    });

    it("should throw an error in a single-element list", () => {
      list.addFirst(1);
      expect(() => list.removeBefore(1)).toThrowError(NoSuchElement);
    });

    it("should throw an error if received item is head ", () => {
      list.addFirst(1);
      list.addFirst(2);
      list.addFirst(3);

      expect(() => list.removeBefore(3)).toThrowError(NoSuchElement);
    });

    it("should throw an error in a list which element does not exist", () => {
      list.addFirst(1);
      list.addLast(2);

      expect(() => list.removeBefore(3)).toThrowError(NoSuchElement);
    });

    it("should call removeFirst in a double-element list", () => {
      list.addFirst(1);
      list.addFirst(2);

      const spy = jest.spyOn(list, "removeFirst");

      expect(list.removeBefore(1)).toBe(2);

      expect(spy).toHaveBeenCalled();

      spy.mockReset();
    });

    it("should update pointers removed element", () => {
      list.addFirst(1);
      list.addFirst(2);
      list.addFirst(3);

      expect(list.removeBefore(1)).toBe(2);

      expect(list.getHead()?.getNext()?.getData()).toBe(1);
      expect(list.getTail()?.getPrevious()?.getData()).toBe(3);
      expect(list.getFirst()).toBe(3);
      expect(list.getLast()).toBe(1);
      expect(list.toArray()).toStrictEqual([3, 1]);
    });

    it("should return removed element", () => {
      list.addFirst(1);
      list.addFirst(2);
      list.addFirst(3);

      expect(list.removeBefore(1)).toBe(2);
    });

    it("should correctly remove multiple item", () => {
      for (let i = 0; i < 1000; i++) list.addFirst(i);

      expect(list.removeBefore(499)).toBe(500);
      expect(list.removeBefore(780)).toBe(781);
      expect(list.removeBefore(0)).toBe(1);

      expect(list.find(500)).toBeNull();
      expect(list.find(781)).toBeNull();
      expect(list.find(1)).toBeNull();

      const arr = [];

      for (let i = 0; i < 1000; i++) {
        if (i === 1 || i === 500 || i === 781) {
          expect(list.find(i)).toBeNull();
          continue;
        }

        expect(list.find(i)).toBe(i);
        arr.push(i);
      }

      expect(list.getSize()).toBe(997);

      expect(list.toArray()).toStrictEqual(arr.reverse());
    });
  });

  describe("addAfter", () => {
    it("should throw an error of an empty list", () => {
      expect(() => list.addAfter(2, 3)).toThrowError(EmptyLinkedList);
    });

    it("should throw an error if item does not exist in list", () => {
      list.addFirst(1);
      list.addFirst(2);

      expect(() => list.addAfter(4, 3)).toThrowError(NoSuchElement);
    });

    it("should add new item after the existing item", () => {
      list.addFirst(1);

      list.addAfter(2, 1);
      list.addAfter(4, 2);
      list.addAfter(111, 4);

      expect(list.getFirst()).toBe(1);
      expect(list.getLast()).toBe(111);
      expect(list.getSize()).toBe(4);

      expect(list.toArray()).toStrictEqual([1, 2, 4, 111]);
    });

    it("should correctly works with multiple items", () => {
      list.addFirst(0);

      for (let i = 0, j = 1; i < 1000; i++, j++) list.addAfter(j, i);

      expect(list.getLast()).toBe(1000);
      expect(list.getSize()).toBe(1001);
      expect(list.getFirst()).toBe(0);

      list.toArray().map((i) => expect(list.find(i)).toBe(i));

      expect(list.toArray()).toStrictEqual([...Array(1001).keys()]);
    });
  });

  describe("removeAfter", () => {
    it("should throw an error of an empty list", () => {
      expect(() => list.removeAfter(2)).toThrowError();
    });

    it("should throw an error if item is tail", () => {
      list.addFirst(1);
      list.addFirst(2);
      list.addFirst(3);

      expect(() => list.removeAfter(1)).toThrowError();
    });

    it("should remove an item in a double-item list", () => {
      list.addFirst(1);
      list.addFirst(2);

      list.removeAfter(2);

      expect(list.getFirst()).toBe(2);
      expect(list.getSize()).toBe(1);
    });

    it("should remove an item that between two item", () => {
      list.addFirst(1);
      list.addFirst(2);
      list.addFirst(3);
      list.addFirst(4);

      list.removeAfter(3);

      expect(list.getFirst()).toBe(4);
      expect(list.getSize()).toBe(3);
      expect(list.getLast()).toBe(1);

      expect(list.toArray()).toStrictEqual([4, 3, 1]);
    });

    it("should return removed item", () => {
      list.addFirst(1);
      list.addFirst(2);
      list.addFirst(3);
      list.addFirst(4);

      expect(list.removeAfter(3)).toBe(2);
    });

    it("should correctly remove multiple items", () => {
      for (let i = 0; i < 1000; i++) list.addFirst(i);

      expect(list.removeAfter(501)).toBe(500);
      expect(list.removeAfter(782)).toBe(781);
      expect(list.removeAfter(2)).toBe(1);

      expect(list.find(500)).toBeNull();
      expect(list.find(781)).toBeNull();
      expect(list.find(1)).toBeNull();

      const arr = [];

      for (let i = 0; i < 1000; i++) {
        if (i === 1 || i === 500 || i === 781) {
          expect(list.find(i)).toBeNull();
          continue;
        }

        expect(list.find(i)).toBe(i);
        arr.push(i);
      }

      expect(list.getSize()).toBe(997);

      expect(list.toArray()).toStrictEqual(arr.reverse());
    });
  });
});
