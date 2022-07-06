import { useCallback, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import type { TapPayInstance } from 'react-native-tappay';

const merchantData = {
  merchantName: 'My Merchant Name',
  merchantIdentifier: 'YOUR-MERCHANT-IDENTIFIER',
  countryCode: 'TW',
  currencyCode: 'TWD',
};
const cartData = [
  {
    itemName: 'total',
    price: 40,
  },
];

function useApplePay(TapPay: TapPayInstance) {
  const [isAvailable, setIsAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [prime, setPrime] = useState('');

  const gerPrime = useCallback(() => {
    setIsLoading(true);
    setPrime('');

    TapPay.isApplePayAvailable()
      .then(_isAvailable => {
        if (!_isAvailable) {
          setIsAvailable(false);
          console.log('nono');

          throw 'ApplePay is not available';
        }
        return TapPay.getApplePayPrime(merchantData, cartData);
      })
      .then(({ prime: _prime }) => setPrime(_prime || ''))
      .catch(() => {
        Alert.alert(
          'Warning!',
          'Please make sure you have finished ApplePay setup, \n and change your merchantIdentifier.',
        );
      })
      .finally(() => setIsLoading(false));
  }, [TapPay]);

  return useMemo(
    () => ({ isAvailable, isLoading, prime, gerPrime }),
    [isAvailable, isLoading, prime, gerPrime],
  );
}

export default useApplePay;
