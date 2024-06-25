import {State} from './useState';
import effectStack from './EffectStack';

type EffectCallBack = () => void;

export class Effect {
  public readonly callback: EffectCallBack;
  public readonly dependingStates: Set<State<any>>;

  constructor(callback: EffectCallBack) {
    this.callback = callback;
    this.dependingStates = new Set();
  }

  public execute() {
    // Dependencies will be restored in state getters
    this.clearDependingStates();
    // Mark as current effect
    effectStack.push(this);

    try {
      this.callback();
    } finally {
      effectStack.pop();
    }
  }

  private clearDependingStates() {
    for (const dependingState of this.dependingStates) {
      dependingState.removeSubscriberEffect(this);
    }

    this.dependingStates.clear();
  }
}

export default function useEffect(callback: EffectCallBack) {
  const effect = new Effect(callback);
  effect.execute(); // First calls callback to init dependencies
}