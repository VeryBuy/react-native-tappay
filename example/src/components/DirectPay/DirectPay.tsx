import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { TapPayInstance } from 'react-native-tappay';

interface Props {
  isLoadedSuccess: boolean;
  TapPay: TapPayInstance;
}

const DirectPay: FC<Props> = _props => {
  return (
    <View>
      <Text>App</Text>
    </View>
  );
};

export default DirectPay;
