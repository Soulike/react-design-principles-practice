import {SubscribingEffects} from './useState';
import {effectStack} from './EffectStack';

type EffectCallBack = () => void;

export interface IEffect {
  execute: EffectCallBack;
  deps: Set<SubscribingEffects>;
}

export function useEffect(callback: EffectCallBack) {
  const execute = () => {
    cleanUp(effect);
    effectStack.push(effect);

    try {
      callback();
    } finally {
      effectStack.pop();
    }
  };

  const effect: IEffect = {
    execute,
    deps: new Set(),
  };

  execute();
}

function cleanUp(effect: IEffect) {
  for (const subscribingEffects of effect.deps) {
    subscribingEffects.delete(effect);
  }

  effect.deps.clear();
}