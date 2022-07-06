import { FC } from 'react';
import { Text, View } from 'react-native';

import Button from '../../elements/Button';
import { ComponentCommonProps } from '../../types/common';
import useApplePay from './useApplePay';

const ApplePay: FC<ComponentCommonProps> = props => {
  const { TapPay } = props;
  const { isAvailable, isLoading, prime, gerPrime } = useApplePay(TapPay);

  return (
    <View>
      <Button text="Get prime" isLoading={isLoading} onPress={gerPrime} />
      {!isAvailable && <Text>LINE is not available</Text>}
      {!!prime && <Text>Prime: {prime}</Text>}
    </View>
  );
};

export default ApplePay;
