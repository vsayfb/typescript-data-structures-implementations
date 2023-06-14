export class FullQueue extends Error {
  constructor() {
    super("Queue is full");
  }
}
