import {Effect} from './useEffect';

class EffectStack {
  private readonly stack: Effect[];

  constructor() {
    this.stack = [];
  }

  public push(effect: Effect) {
    this.stack.push(effect);
  }

  public pop() {
    this.stack.pop();
  }

  public getCurrent(): Effect | null {
    return this.stack[this.stack.length - 1] ?? null;
  }
}

export default new EffectStack();