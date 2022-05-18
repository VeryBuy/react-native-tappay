import { useCallback, useMemo } from 'react';
import type { TapPayInstance } from 'react-native-tappay';

function useLINEPay(_TapPay: TapPayInstance) {
  const gerPrime = useCallback(() => {
    // TODO
  }, []);

  return useMemo(
    () => ({ isAvailable: false, isLoading: false, prime: '', gerPrime }),
    [gerPrime],
  );
}

export default useLINEPay;
