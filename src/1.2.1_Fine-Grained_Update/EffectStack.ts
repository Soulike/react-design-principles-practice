import {IEffect} from './useEffect';

class EffectStack {
  private readonly stack: IEffect[];

  constructor() {
    this.stack = [];
  }

  public push(effect: IEffect) {
    this.stack.push(effect);
  }

  public pop() {
    this.stack.pop();
  }

  public getCurrent(): IEffect | null {
    return this.stack[this.stack.length - 1] ?? null;
  }
}

const effectStack = new EffectStack();

export {effectStack};