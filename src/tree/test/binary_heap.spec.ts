import { KeyValuePair } from "../../hashtable/helper/key_value_pair";
import { MaxHeap } from "../binary_heap/binary_heap";

describe("BinaryHeap", () => {
  let heap: MaxHeap<number, number> & {
    children(index: number): {
      left: KeyValuePair<number, number>;
      right: KeyValuePair<number, number>;
    } | null;
    parent(index: number): KeyValuePair<number, number>;
  };

  beforeEach(() => {
    heap = new MaxHeap<number, number>() as any;

    // to cover more cases in test

    heap.children = function (index: number): {
      left: KeyValuePair<number, number>;
      right: KeyValuePair<number, number>;
    } | null {
      //@ts-ignore -> private field
      const heap = this.heap;

      const parent = heap[index];

      if (!parent) return null;

      const left = heap[2 * index + 1];
      const right = heap[2 * index + 2];

      return {
        left: left || null,
        right: right || null,
      };
    };

    heap.parent = function (index: number): KeyValuePair<number, number> {
      //@ts-ignore -> private field
      const heap = this.heap;

      return heap[Math.floor((index - 1) / 2)] || null;
    };
  });

  function shouldSatifyHeapProperty(array: number[]) {
    for (let i = 0; i < Math.floor(array.length / 2) - 1; i++) {
      const element = array[i];
      const children = heap.children(i);
      const parent = heap.parent(i);

      if (parent) expect(parent.getData()).toBeGreaterThanOrEqual(element);

      const { left, right } = children!;

      if (left) {
        expect(element).toBeGreaterThanOrEqual(left.getData());
      }

      if (right) {
        expect(element).toBeGreaterThanOrEqual(right.getData());
      }
    }
  }

  function generateRandomNums(size: number): number[] {
    let randoms: number[] = [];

    while (randoms.length < size) {
      const random = Math.floor(Math.random() * (100 * size));

      if (randoms.includes(random)) continue;

      heap.insert(random, random);
      randoms.push(random);
    }

    return randoms;
  }

  describe("insert", () => {
    it("should satifsy heap property", () => {
      heap.insert(2, 2);
      heap.insert(4, 4);
      heap.insert(5, 5);

      expect(heap.parent(0)).toBeNull();

      expect(heap.children(0)).toEqual({
        left: { key: 2, data: 2 },
        right: { key: 4, data: 4 },
      });

      expect(heap.parent(1)).toEqual({ key: 5, data: 5 });
      expect(heap.parent(2)).toEqual({ key: 5, data: 5 });
    });

    it("should correctly insert multiple elements", () => {
      generateRandomNums(1000);

      const array = heap.toArray();

      shouldSatifyHeapProperty(array);
    });
  });

  describe("remove", () => {
    it("should satisfy the heap property by swapping with its parent", () => {
      heap.insert(100, 100);
      heap.insert(80, 80);
      heap.insert(70, 70);
      heap.insert(110, 110);
      heap.insert(130, 130);
      heap.insert(150, 150);
      heap.insert(120, 120);

      expect(heap.toArray()).toEqual([150, 110, 130, 80, 100, 70, 120]);

      expect(heap.remove(80)).toBe(80);

      expect(heap.toArray()).toEqual([150, 120, 130, 110, 100, 70]);
    });

    it("should satisfy the heap property by swapping with its greatest child", () => {
      heap.insert(100, 100);
      heap.insert(80, 80);
      heap.insert(110, 110);
      heap.insert(130, 130);
      heap.insert(150, 150);
      heap.insert(120, 120);
      heap.insert(70, 70);
      heap.insert(60, 60);

      expect(heap.toArray()).toEqual([150, 130, 120, 80, 110, 100, 70, 60]);

      expect(heap.remove(120)).toBe(120);

      expect(heap.toArray()).not.toEqual([150, 130, 60, 80, 110, 100, 70]);

      expect(heap.toArray()).toEqual([150, 130, 100, 80, 110, 60, 70]);
    });

    it("should work correctly with multiple elements", () => {
      generateRandomNums(1000);

      let array = heap.toArray();

      while (array.length > 0) {
        const rand = Math.floor(Math.random() * array.length);

        let removed = array[rand];

        expect(heap.remove(removed)).toBe(removed);

        array = array.filter((v) => v !== removed);

        if (array.length % 200 == 0) shouldSatifyHeapProperty(heap.toArray());
      }

      expect(heap.getSize()).toBe(0);
      expect(heap.toArray()).toEqual([]);
    });
  });

  describe("pull", () => {
    it("should return null", () => {
      expect(heap.getSize()).toBe(0);
      expect(heap.pull()).toBeNull();
    });

    it("should remove and return root and reset heap", () => {
      heap.insert(55, 55);

      expect(heap.toArray()).toEqual([55]);

      expect(heap.pull()).toBe(55);

      expect(heap.toArray()).toEqual([]);

      expect(heap.getSize()).toBe(0);

      expect(heap.peek()).toBeNull();
    });

    it("should work correctly with multiple elements", () => {
      generateRandomNums(500);

      while (heap.getSize() > 0) {
        let biggest = heap.peek();

        const pull = heap.pull();

        expect(pull).not.toBeNull();

        expect(pull).toBe(biggest);

        if (heap.getSize() % 50 == 0) {
          shouldSatifyHeapProperty(heap.toArray());
        }
      }

      expect(heap.pull()).toBeNull();
      expect(heap.getSize()).toBe(0);

      shouldSatifyHeapProperty(heap.toArray());
    });
  });

  describe("peek", () => {
    it("should return null", () => {
      expect(heap.getSize()).toBe(0);
      expect(heap.peek()).toBeNull();
    });

    it("should return the root", () => {
      heap.insert(10, 10);
      heap.insert(100, 100);

      expect(heap.peek()).toBe(100);
    });
  });
});
