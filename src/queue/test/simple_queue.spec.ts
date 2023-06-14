import { NoSuchElement } from "../../errors/no_such_element";
import { Queue } from "../simple/simple_queue";

describe("SimpleQueue", () => {
  let queue: Queue<number> & { getBack(): number; getFront(): number };

  beforeEach(() => {
    queue = new Queue() as any;

    // to cover more cases in tests

    queue.getBack = function (): number {
      //@ts-ignore
      return this.back;
    };

    queue.getFront = function (): number {
      //@ts-ignore
      return this.front;
    };
  });

  describe("enqueue", () => {
    it("should increase the back pointer by one", () => {
      expect(queue.getBack()).toBe(0);

      queue.enqueue(1);

      expect(queue.getBack()).toBe(1);
    });

    it("should resize the queue when it is full", () => {
      expect(queue.getCapacity()).toBe(10);

      for (let i = 0; i < 11; i++) queue.enqueue(i);

      expect(queue.getCapacity()).toBe(20);
    });
  });

  describe("dequeue", () => {
    it("should throw NoSuchElement error when queue is empty", () => {
      expect(() => queue.dequeue()).toThrowError(NoSuchElement);
    });

    it("should increase the front pointer by one", () => {
      queue.enqueue(1);
      queue.enqueue(2);

      expect(queue.getFront()).toBe(0);

      queue.dequeue();

      expect(queue.getFront()).toBe(1);
    });

    it("should return the removed element", () => {
      queue.enqueue(1);

      expect(queue.dequeue()).toBe(1);
    });

    it("should reset pointers when the queue is empty after removing the first item in the queue", () => {
      for (let i = 0; i < 10; i++) queue.enqueue(i);

      for (let i = 0; i < 10; i++) expect(queue.dequeue()).toBe(i);

      expect(queue.getFront()).toBe(0);
      expect(queue.getBack()).toBe(0);
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
    it("should throw NoSuchElement error when queue is empty", () => {
      expect(() => queue.rear()).toThrowError(NoSuchElement);
    });

    it("should return the last element in the queue", () => {
      queue.enqueue(1);
      queue.enqueue(2);

      expect(queue.rear()).toBe(2);
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
      queue.enqueue(1);
      queue.enqueue(2);

      queue.dequeue();

      expect(queue.getSize()).toBe(1);
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
