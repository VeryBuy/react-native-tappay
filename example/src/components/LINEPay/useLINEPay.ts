import { useCallback, useMemo, useState } from 'react';
import type { TapPayInstance } from 'react-native-tappay';

function useLINEPay(TapPay: TapPayInstance) {
  const [isAvailable, setIsAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [prime, setPrime] = useState('');

  const gerPrime = useCallback(() => {
    setIsLoading(true);
    setPrime('');

    TapPay.isLinePayAvailable()
      .then(_isAvailable => {
        if (!_isAvailable) {
          setIsAvailable(false);

          throw 'LINE is not available';
        }

        return TapPay.getLinePayPrime('myexample://lne_pay_redirect');
      })
      .then(({ prime: _prime }) => setPrime(_prime || ''))
      .catch(console.log)
      .finally(() => setIsLoading(false));
  }, [TapPay]);

  return useMemo(
    () => ({ isAvailable, isLoading, prime, gerPrime }),
    [isAvailable, isLoading, prime, gerPrime],
  );
}

export default useLINEPay;
