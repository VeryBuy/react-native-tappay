import React from 'react';
import { View } from 'react-native';
import { useTapPay } from 'react-native-tappay';

import DirectPay from '../DirectPay';
import TAPPAY_CONFIG from '../../constants/TapPayConfig';

const App = () => {
  const [isLoadedSuccess, TapPay] = useTapPay(TAPPAY_CONFIG);

  return (
    <View>
      <DirectPay isLoadedSuccess={isLoadedSuccess} TapPay={TapPay} />
    </View>
  );
};

export default App;
