import React, { FC } from 'react';
import { SafeAreaView, Text } from 'react-native';

import Button from '../../elements/Button';
import { ComponentCommonProps } from '../../types/common';
import useLINEPay from './useLINEPay';

const LINEPay: FC<ComponentCommonProps> = props => {
  const { TapPay } = props;
  const { isAvailable, isLoading, prime, gerPrime } = useLINEPay(TapPay);

  return (
    <SafeAreaView>
      <Button text="Get prime" isLoading={isLoading} onPress={gerPrime} />
      {!isAvailable && <Text>LINE is not available</Text>}
      {!!prime && <Text>Prime: {prime}</Text>}
    </SafeAreaView>
  );
};

export default LINEPay;
