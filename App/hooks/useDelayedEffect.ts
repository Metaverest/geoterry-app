import { DependencyList, useEffect, useState } from 'react';

// to add a break time between consecutive calls of the effect, default value is 5 mins
function useBreakTimeEffect(
  callback: () => void,
  deps: DependencyList,
  options?: { breakTime?: number; skipBreakTime?: boolean },
) {
  const [lastCallTime, setLastCallTime] = useState<number | null>(null);
  const delayedEffect = () => {
    const now = Date.now();
    if (!lastCallTime || options?.skipBreakTime || now - lastCallTime > (options?.breakTime || 5 * 60 * 1000)) {
      callback();
      setLastCallTime(now);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(delayedEffect, deps);
}

export default useBreakTimeEffect;
