import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import type { TapPayInstance } from 'react-native-tappay';

const merchantData = {
  merchantName: 'My Merchant Name',
  merchantIdentifier: 'merchant.com.verybuy.verybuy',
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

  useEffect(() => {
    TapPay.isApplePayAvailable().then(_isAvailable => {
      if (!_isAvailable) {
        setIsAvailable(false);
        console.log('nono');

        throw 'ApplePay is not available';
      }
    });
    TapPay.webSetupApplePay(merchantData, cartData);
  }, [TapPay]);

  const gerPrime = useCallback(() => {
    setIsLoading(true);
    setPrime('');

    TapPay.webGetApplePayPrime()
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
