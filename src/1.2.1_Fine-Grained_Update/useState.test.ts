import {describe, it, expect} from '@jest/globals';
import useState from './useState';

describe('useState', () => {
  it('should set initial state', () => {
    const [count] = useState(8);
    expect(count()).toBe(8);
  });

  it('should set state', () => {
    const [count, setCount] = useState(0);
    setCount(4);
    expect(count()).toBe(4);

    setCount(777);
    expect(count()).toBe(777);
  });
});