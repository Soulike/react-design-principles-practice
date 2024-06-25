import {describe, it, expect, jest} from '@jest/globals';
import {useState} from './useState';
import {useEffect} from './useEffect';

describe('useEffect', () => {
  it('should call callback with dependencies', () => {
    const [count, setCount] = useState(0);
    let currentCount = 0;
    const callback1 = jest.fn(() => {
      currentCount = count();
    });
    const callback2 = jest.fn(() => {
    });

    useEffect(callback1);
    useEffect(callback2);

    expect(currentCount).toBe(0);
    expect(callback1).toBeCalledTimes(1);
    expect(callback2).toBeCalledTimes(1);

    setCount(2);
    expect(currentCount).toBe(2);
    expect(callback1).toBeCalledTimes(2);
    expect(callback2).toBeCalledTimes(1);
  });

  it('should handle dependency change', () => {
    const [name1, setName1] = useState('Li Lei');
    const [name2, setName2] = useState('Han Meimei');
    const [showAllNames, setShowAllNames] = useState(true);

    const showNames = () => {
      if (!showAllNames()) {
        return name1();
      }
      return `${name1()},${name2()}`;
    };

    let affectedCurrentNames = '';
    useEffect(() => {
      affectedCurrentNames = showNames();
    });
    expect(affectedCurrentNames).toBe('Li Lei,Han Meimei');

    setName1('Xiao Ming');
    expect(affectedCurrentNames).toBe('Xiao Ming,Han Meimei');

    // Remove dependency of name2
    setShowAllNames(false);
    expect(affectedCurrentNames).toBe('Xiao Ming');

    setName2('Xiao Hong');
    expect(affectedCurrentNames).toBe('Xiao Ming');
  });
});