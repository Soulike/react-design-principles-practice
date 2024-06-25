import {IEffect} from './useEffect';
import {effectStack} from './EffectStack';

type Getter<T> = () => T;
type Setter<T> = (newValue: T) => void;

export type SubscribingEffects = Set<IEffect>;

export function useState<T>(): [Getter<T | undefined>, Setter<T>];
export function useState<T>(initValue: T): [Getter<T>, Setter<T>];

export function useState<T>(initValue?: T): [Getter<T | undefined>, Setter<T>] {
  let value = initValue;
  const subscribingEffects: Set<IEffect> = new Set();

  const getter: Getter<typeof initValue> = () => {
    const currentEffect = effectStack.getCurrent();
    if (currentEffect) {
      subscribe(currentEffect, subscribingEffects);
    }
    return value;
  };
  const setter: Setter<T> = (newValue: T) => {
    value = newValue;
    // Since effect.execute() will call effect callback, which further calls getter
    // modifying subscribingEffects, so we use a copy here
    const subscribingEffectsCopy = Array.from(subscribingEffects);
    for (const effect of subscribingEffectsCopy) {
      effect.execute();
    }
  };

  return [getter, setter];
}

function subscribe(effect: IEffect, subscribingEffects: SubscribingEffects) {
  subscribingEffects.add(effect);
  effect.deps.add(subscribingEffects);
}