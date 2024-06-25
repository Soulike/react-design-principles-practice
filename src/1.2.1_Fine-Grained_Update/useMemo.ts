import useState from './useState';
import useEffect from './useEffect';

export function useMemo<T>(calculator: () => T) {
  const [cachedValue, setCachedValue] = useState<T>();
  useEffect(() => {
    setCachedValue(calculator());
  });
  return cachedValue;
}