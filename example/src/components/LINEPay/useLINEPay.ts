import { useCallback, useMemo, useState } from 'react';
import Config from 'react-native-config';
import type { TapPayInstance } from 'react-native-tappay';

const LINE_PAY_RETURN_URL = `${Config.REACT_APP_SCHEME}://lne_pay_redirect`;

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

        return TapPay.getLinePayPrime(LINE_PAY_RETURN_URL);
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
