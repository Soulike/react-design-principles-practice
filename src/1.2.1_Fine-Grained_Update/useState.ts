import {Effect} from './useEffect';
import effectStack from './EffectStack';

type Getter<T> = () => T;
type Setter<T> = (newValue: T) => void;

export class State<T> {
  private currentValue: T;
  private readonly subscriberEffects: Set<Effect>;

  constructor(initValue: T) {
    this.currentValue = initValue;
    this.subscriberEffects = new Set();
  }

  public getter: Getter<T> = () => {
    const currentEffect = effectStack.getCurrent();
    if (currentEffect) {
      this.addSubscriberEffect(currentEffect);
    }
    return this.currentValue;
  };

  public setter: Setter<T> = (newValue: T) => {
    this.currentValue = newValue;
    // Since effect.execute() will call effect callback, which further calls getter
    // modifying subscribingEffects, so we use a copy here
    const subscriberEffectsCopy = Array.from(this.subscriberEffects);
    for (const effect of subscriberEffectsCopy) {
      effect.execute();
    }
  };

  public addSubscriberEffect(effect: Effect) {
    this.subscriberEffects.add(effect);
    effect.dependingStates.add(this);
  }

  public removeSubscriberEffect(effect: Effect) {
    this.subscriberEffects.delete(effect);
    effect.dependingStates.delete(this);
  }
}

export default function useState<T>(): [Getter<T | undefined>, Setter<T>];
export default function useState<T>(initValue: T): [Getter<T>, Setter<T>];

export default function useState<T>(initValue?: T): [Getter<T | undefined>, Setter<T>] {
  const state = new State(initValue);
  return [state.getter, state.setter];
}