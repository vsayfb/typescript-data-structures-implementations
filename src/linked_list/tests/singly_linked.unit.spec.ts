import { Node } from "../singly/node";
import { SinglyLinkedList } from "../singly/singly_linked_list";

describe("SinglyLinkedList", () => {
  let list: SinglyLinkedList<number> & { getHead(): Node<number> };

  beforeEach(() => {
    list = new SinglyLinkedList<number>() as any;

    // to cover more cases in tests
    list.getHead = function () {
      //@ts-ignore -> private field
      return this.head as Node<T>;
    };
  });

  describe("addFirst", () => {
    it("should add the first item to the beginning of an empty list", () => {
      list.addFirst(1);

      expect(list.getFirst()).toBe(1);
      expect(list.getSize()).toBe(1);
    });

    it("should add a new item to the beginning of a non-empty list", () => {
      list.addFirst(1);
      list.addFirst(2);

      expect(list.getFirst()).toBe(2);
      expect(list.getSize()).toBe(2);
    });

    it("should correctly update the head pointer after adding a new item", () => {
      list.addFirst(1);
      list.addFirst(2);

      expect(list.getFirst()).toBe(2);
      expect(list.getHead().getData()).toBe(2);
    });

    it("should correctly update the next pointer of the new head after adding a new item", () => {
      list.addFirst(1);
      list.addFirst(2);

      expect(list.getHead().getNext()?.getData()).toBe(1);
    });

    it("should add multiple items correctly", () => {
      for (let i = 0; i < 1000; i++) {
        list.addFirst(i);
        expect(list.getFirst()).toBe(i);
      }

      expect(list.getFirst()).toBe(999);
      expect(list.getSize()).toBe(1000);
    });
  });

  describe("removeFirst", () => {
    it("should throw an error of an empty list", () => {
      expect(() => list.removeFirst()).toThrowError();
    });

    it("should remove the head of a non-empty list", () => {
      list.addFirst(1);
      list.addFirst(2);
      list.addFirst(3);

      list.removeFirst();

      expect(list.getSize()).toBe(2);
      expect(list.getFirst()).toBe(2);
    });

    it("should update the next pointer of last head", () => {
      list.addFirst(1);
      list.addFirst(2);
      list.addFirst(3);

      list.removeFirst();

      expect(list.getFirst()).toBe(2);
      expect(list.getHead().getNext()?.getData()).toBe(1);
    });

    it("should return the removed head", () => {
      list.addFirst(1);
      list.addFirst(2);
      list.addFirst(3);

      expect(list.removeFirst()).toBe(3);
    });

    it("should correctly remove multiple items", () => {
      for (let i = 0; i < 1000; i++) list.addFirst(i);

      for (let i = 999; i >= 0; i--) {
        expect(list.removeFirst()).toBe(i);
      }

      expect(list.isEmpty()).toBe(true);

      expect(list.getSize()).toBe(0);
    });
  });

  describe("addLast", () => {
    it("should call addFirst and add the new item as beginning of an empty list", () => {
      const spy = jest.spyOn(list, "addFirst");

      list.addLast(1);

      expect(list.addFirst).toHaveBeenCalledWith(1);

      expect(list.getHead().getData()).toBe(1);

      spy.mockReset();
    });

    it("should add a new item to the end of a non-empty list", () => {
      list.addFirst(1);
      list.addFirst(2);

      list.addLast(3);

      expect(list.getLast()).toBe(3);
    });

    it("should correctly update the next pointer after adding a new item", () => {
      list.addFirst(1);
      list.addFirst(2);

      list.addLast(3);

      expect(list.getLast()).toBe(3);

      expect(list.getHead().getNext()?.getNext()?.getData()).toBe(3);

      expect(list.getHead().getNext()?.getNext()?.getNext()).toBeNull();
    });

    it("should add multiple items correctly", () => {
      for (let i = 0; i < 1000; i++) {
        list.addLast(i);
        expect(list.getLast()).toBe(i);
      }

      expect(list.getFirst()).toBe(0);
      expect(list.getSize()).toBe(1000);
    });
  });

  describe("removeLast", () => {
    it("should throw an error on an empty list", () => {
      expect(() => list.removeLast()).toThrowError();
    });

    it("should call removeFirst method and remove element in a single-element list", () => {
      const spy = jest.spyOn(list, "removeFirst");

      list.addLast(1);

      expect(list.removeLast()).toBe(1);

      expect(list.removeFirst).toHaveBeenCalled();

      expect(list.getSize()).toBe(0);

      spy.mockReset();
    });

    it("should remove the last element of a non-empty list", () => {
      list.addLast(1);
      list.addLast(2);
      list.addLast(3);

      expect(list.removeLast()).toBe(3);
      expect(list.getLast()).toBe(2);
      expect(list.getSize()).toBe(2);
    });

    it("should return removed item", () => {
      list.addLast(1);
      list.addLast(2);
      list.addLast(3);

      expect(list.removeLast()).toBe(3);
    });

    it("should correctly remove multiple items", () => {
      for (let i = 0; i < 1000; i++) list.addLast(i);

      for (let i = 999; i >= 0; i--) expect(list.removeLast()).toBe(i);

      expect(list.getLast()).toBeNull();
      expect(list.isEmpty()).toBe(true);
      expect(list.getSize()).toBe(0);
    });
  });

  describe("getLast", () => {
    it("should return null in an empty list", () => {
      expect(list.getLast()).toBeNull();
    });

    it("should return the last item that added to list", () => {
      list.addFirst(1);
      list.addFirst(2);
      list.addLast(3);

      expect(list.getLast()).toBe(3);
    });
  });

  describe("addBefore", () => {
    it("should throw error of an empty list", () => {
      expect(() => list.addBefore(2, 1)).toThrowError();
    });

    it("should call addFirst with a single-element list", () => {
      list.addFirst(1);

      const spy = jest.spyOn(list, "addFirst");

      list.addBefore(2, 1);

      expect(list.addFirst).toHaveBeenCalledWith(2);

      expect(list.getFirst()).toBe(2);

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
      expect(() => list.removeBefore(2)).toThrowError();
    });

    it("should throw an error if item is head", () => {
      list.addFirst(1);
      list.addFirst(2);
      list.addFirst(3);

      expect(() => list.removeAfter(1)).toThrowError();
    });

    it("should remove the head if before node is head", () => {
      list.addFirst(1);
      list.addFirst(3);

      expect(list.removeBefore(1)).toBe(3);
      expect(list.getFirst()).toBe(1);
      expect(list.getSize()).toBe(1);
    });

    it("should correctly update next pointer head if before is head", () => {
      list.addFirst(1);
      list.addFirst(3);

      expect(list.removeBefore(1)).toBe(3);
      expect(list.getHead().getNext()).toBeNull();
    });

    it("should remove an item that between two item", () => {
      list.addFirst(1);
      list.addFirst(2);
      list.addFirst(3);
      list.addFirst(4);

      expect(list.removeBefore(3)).toBe(4);

      expect(list.getFirst()).toBe(3);
      expect(list.getSize()).toBe(3);
      expect(list.getLast()).toBe(1);

      expect(list.toArray()).toStrictEqual([3, 2, 1]);
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
      expect(() => list.addAfter(2, 3)).toThrowError();
    });

    it("should throw an error if item does not exist in list", () => {
      list.addFirst(1);
      list.addFirst(2);

      expect(() => list.addAfter(4, 3)).toThrowError();
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

  describe("remove", () => {
    it("should throw an error of an empty list", () => {
      expect(() => list.remove(3)).toThrowError();
    });

    it("should call removeFirst method and remove the item in a single-item list", () => {
      list.addFirst(1);

      const spy = jest.spyOn(list, "removeFirst");

      const removed = list.remove(1);

      expect(list.removeFirst).toHaveBeenCalled();

      expect(removed).toBe(1);

      spy.mockReset();
    });

    it("should return null if item does not exist in the list", () => {
      list.addFirst(1);
      list.addFirst(2);
      list.addFirst(3);

      expect(list.remove(4)).toBeNull();
    });

    it("should return the removed item", () => {
      list.addFirst(1);
      list.addFirst(2);
      list.addFirst(3);

      expect(list.remove(2)).toBe(2);
      expect(list.getSize()).toBe(2);
    });

    it("should remove correctly multiple items", () => {
      for (let i = 0; i < 1000; i++) list.addFirst(i);

      for (let i = 0; i < 1000; i++) list.remove(i);

      expect(list.isEmpty()).toBe(true);
      expect(list.getHead()).toBeNull();
      expect(list.getSize()).toBe(0);
    });
  });

  describe("isEmpty", () => {
    let list: SinglyLinkedList<number>;

    beforeEach(() => {
      list = new SinglyLinkedList();
    });

    it("should return true in an empty list", () => {
      expect(list.isEmpty()).toBe(true);
    });

    it("should return false in a non-empty list", () => {
      list.addFirst(1);

      expect(list.isEmpty()).toBe(false);
    });
  });
});
