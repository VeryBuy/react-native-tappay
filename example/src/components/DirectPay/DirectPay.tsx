import React, { FC, useState } from 'react';
import { Button, SafeAreaView, Text } from 'react-native';
import { LiteCreditCardInput } from 'react-native-credit-card-input';
import safeAwait from 'safe-await';

import { ComponentCommonProps } from '../../types/common';
import { AppCardInfo } from './types';

const DirectPay: FC<ComponentCommonProps> = props => {
  const { TapPay } = props;
  const [cardInfo, setCardInfo] = useState({} as AppCardInfo);

  const onSubmit = async () => {
    const { values } = cardInfo;
    const number = values.number.replace(/\s/g, '');
    const [month, day] = values.expiry.split('/');

    await TapPay.validateCard(number, month, day, values.cvc);
    TapPay.setCard(number, month, day, values.cvc);

    const [error, primeResp] = await safeAwait(TapPay.getDirectPayPrime());

    if (error) {
      return;
    }

    setCardInfo(prev => ({ ...prev, prime: primeResp.prime }));
  };

  return (
    <SafeAreaView>
      <LiteCreditCardInput onChange={setCardInfo} />
      <Button title="Submit" onPress={onSubmit} disabled={!cardInfo.valid} />
      <Text>{JSON.stringify(cardInfo, null, 2)}</Text>
    </SafeAreaView>
  );
};

export default DirectPay;
