import { EmptyStack } from "../errors/empty_stack";
import { Node } from "../node";
import { Stack } from "../stack";

describe("Stack", () => {
  let stack: Stack<number> & { getTop(): Node<number> | null };

  beforeEach(() => {
    stack = new Stack() as any;

    // to cover more cases in tests
    stack.getTop = function () {
      //@ts-ignore
      return this.top;
    };
  });

  describe("push", () => {
    it("should add new item to the top", () => {
      stack.push(1);

      expect(stack.peek()).toBe(1);
    });

    it("should update previous pointer", () => {
      stack.push(1);

      expect(stack.getTop()?.getPrevios()).toBeNull();

      stack.push(2);

      expect(stack.getTop()?.getPrevios()?.getData()).toBe(1);
    });

    it("should works correctly with multiple items", () => {
      for (let i = 0; i < 1000; i++) stack.push(i);

      expect(stack.peek()).toBe(999);
      expect(stack.getSize()).toBe(1000);
    });
  });

  describe("pop", () => {
    it("should throw an exception of empty stack", () => {
      expect(() => stack.pop()).toThrowError(EmptyStack);
    });

    it("should remove the last element added to the stack", () => {
      stack.push(1);
      stack.push(2);

      expect(stack.pop()).toBe(2);
    });

    it("should update the top pointer", () => {
      stack.push(1);
      stack.push(2);

      expect(stack.getTop()?.getData()).toBe(2);
      expect(stack.getTop()?.getPrevios()?.getData()).toBe(1);
      expect(stack.peek()).toBe(2);

      stack.pop();

      expect(stack.getTop()?.getData()).toBe(1);
      expect(stack.getTop()?.getPrevios()).toBeNull();
      expect(stack.peek()).toBe(1);
    });

    it("should works correctly with multiple items", () => {
      for (let i = 0; i < 1000; i++) stack.push(i);

      for (let i = 999; i >= 0; i--) expect(stack.pop()).toBe(i);

      expect(stack.getSize()).toBe(0);
    });
  });

  describe("peek", () => {
    it("should return null in an empty stack", () => {
      expect(stack.peek()).toBeNull();
    });

    it("should the top item in the stack", () => {
      stack.push(1);

      expect(stack.peek()).toBe(1);
    });

    it("should works correctly with multiple items", () => {
      for (let i = 0; i < 1000; i++) stack.push(i);

      expect(stack.peek()).toBe(999);
    });
  });

  describe("toArray", () => {
    it("should throw an error of an empty stack", () => {
      expect(stack.toArray()).toStrictEqual([]);
    });

    it("should return an array in a non-empty stack", () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);

      expect(stack.toArray()).toStrictEqual([3, 2, 1]);
    });
  });

  describe("getSize", () => {
    it("should return size", () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);

      expect(stack.getSize()).toBe(3);
    });
  });
});
