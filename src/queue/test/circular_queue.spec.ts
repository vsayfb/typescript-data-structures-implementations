import { NoSuchElement } from "../../errors/no_such_element";
import { CircularQueue } from "../circular/circular_queue";
import { Queue } from "../simple/simple_queue";

describe("CircularQueue", () => {
  let queue: CircularQueue<number> & {
    getBack(): number;
    getFront(): number;
    get(): number[];
  };

  function newQueue(capacity: number): CircularQueue<number> & {
    getBack(): number;
    getFront(): number;
    get(): number[];
  } {
    queue = new CircularQueue(capacity) as any;

    // to cover more cases in tests

    queue.getBack = function (): number {
      //@ts-ignore
      return this.back;
    };

    queue.getFront = function (): number {
      //@ts-ignore
      return this.front;
    };

    queue.get = function (): number[] {
      //@ts-ignore
      return this.queue;
    };

    return queue;
  }

  beforeEach(() => {
    newQueue(5);
  });

  describe("enqueue", () => {
    it("should resize the queue when there is no empty space for new elements", () => {
      expect(queue.getCapacity()).toBe(5);

      for (let i = 0; i < 4; i++) queue.enqueue(i);

      expect(queue.getCapacity()).toBe(5);

      queue.enqueue(4);

      expect(queue.getCapacity()).toBe(10);
    });

    it("should not resize the array if there are empty spaces in the queue", () => {
      expect(queue.getCapacity()).toBe(5);

      for (let i = 0; i < 4; i++) queue.enqueue(i);

      for (let i = 0; i < 2; i++) queue.dequeue();

      queue.enqueue(4);

      expect(queue.getCapacity()).toBe(5);
    });

    it("should wrap the queue to use empty spaces correctly", () => {
      for (let i = 0; i < 4; i++) queue.enqueue(i);

      expect(queue.get()).toEqual([0, 1, 2, 3, undefined]);

      queue.dequeue();
      queue.dequeue();

      expect(queue.get()).toEqual([undefined, undefined, 2, 3, undefined]);

      expect(queue.getBack()).toBe(4);

      queue.enqueue(0);

      // wrapped
      expect(queue.getBack()).toBe(0);

      queue.enqueue(1);

      expect(queue.get()).toEqual([1, undefined, 2, 3, 0]);
    });

    it("should unwrap the queue when there is only one empty space", () => {
      for (let i = 0; i < 4; i++) queue.enqueue(i);

      expect(queue.get()).toEqual([0, 1, 2, 3, undefined]);

      queue.dequeue();
      queue.dequeue();

      expect(queue.get()).toEqual([undefined, undefined, 2, 3, undefined]);

      queue.enqueue(0);

      expect(queue.getBack()).toBe(0);

      queue.enqueue(1);

      expect(queue.get()).toEqual([1, undefined, 2, 3, 0]);

      queue.enqueue(5);

      expect(queue.getBack()).toBe(5);

      expect(queue.get()).toEqual([
        2,
        3,
        0,
        1,
        5,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ]);
    });
  });

  describe("dequeue", () => {
    it("should throw NoSuchElement error when queue is empty", () => {
      expect(() => queue.dequeue()).toThrowError(NoSuchElement);
    });

    it("should increment the front pointer by one and return the removed element", () => {
      queue.enqueue(1);
      queue.enqueue(2);

      expect(queue.dequeue()).toBe(1);

      expect(queue.getFront()).toBe(1);
    });

    it("should set front and back pointers to 0 when the array just contains empty spaces", () => {
      queue.enqueue(1);
      queue.enqueue(2);

      queue.dequeue();

      expect(queue.getFront()).toBe(1);
      expect(queue.getBack()).toBe(2);

      queue.dequeue();

      expect(queue.getFront()).toBe(0);
      expect(queue.getBack()).toBe(0);
    });

    it("should set the front pointer to 0 when there is only one element and the front pointer points it", () => {
      queue = newQueue(3);

      queue.enqueue(1);
      queue.enqueue(2);

      expect(queue.getBack()).toBe(2);

      queue.dequeue();

      queue.enqueue(3);

      expect(queue.getBack()).toBe(0);

      queue.dequeue();

      expect(queue.getFront()).toBe(2);

      queue.dequeue();

      expect(queue.getFront()).toBe(0);
    });
  });

  describe("peek", () => {
    it("should throw NoSuchElement error when queue is empty", () => {
      expect(() => queue.peek()).toThrowError(NoSuchElement);
    });

    it("should return the first element in the queue", () => {
      queue.enqueue(1);
      queue.enqueue(2);

      expect(queue.peek()).toBe(1);
    });
  });

  describe("rear", () => {
    it("should return the item which is at the last index when the back is 0", () => {
      for (let i = 0; i < 4; i++) queue.enqueue(i);

      queue.dequeue();
      queue.dequeue();

      queue.enqueue(1);

      expect(queue.getBack()).toBe(0);

      expect(queue.rear()).toBe(queue.get()[queue.get().length - 1]);

      expect(queue.rear()).toBe(1);
    });

    it("should return the last element in the queue", () => {
      for (let i = 0; i < 4; i++) queue.enqueue(i);

      expect(queue.rear()).toBe(3);
    });
  });

  describe("isEmpty", () => {
    it("should return false if there are elements in the queue", () => {
      queue.enqueue(1);
      queue.enqueue(2);

      expect(queue.isEmpty()).toBe(false);
    });

    it("should return true if there is no element in the queue", () => {
      queue.enqueue(1);
      queue.enqueue(2);

      queue.dequeue();
      queue.dequeue();

      expect(queue.isEmpty()).toBe(true);
    });
  });

  describe("getSize", () => {
    it("should return the number of elements in the queue", () => {
      for (let i = 0; i < 4; i++) queue.enqueue(i);

      expect(queue.getSize()).toBe(4);

      const wrappedQueue = newQueue(5);

      for (let i = 0; i < 4; i++) wrappedQueue.enqueue(i);

      for (let i = 0; i < 2; i++) wrappedQueue.dequeue();

      for (let i = 0; i < 2; i++) wrappedQueue.enqueue(i);

      expect(wrappedQueue.getSize()).toBe(4);
    });
  });

  describe("getCapacity", () => {
    it("should return the length of the array ", () => {
      expect(queue.getCapacity()).toBe(5);

      for (let i = 0; i < 5; i++) queue.enqueue(i);

      expect(queue.getCapacity()).toBe(10);
    });
  });
});
