import React from 'react';
import { View } from 'react-native';
import { useTapPay } from 'react-native-tappay';

import DirectPay from '../DirectPay';

// from: https://github.com/TapPay/tappay-web-example/blob/5862e13e5aea0c23463cdf4fa866c51a3debee88/Direct_Pay_iframe/example/index.html#L13
const TAPPAY_CONFIG = {
  appId: 11327,
  appKey: 'app_whdEWBH8e8Lzy4N6BysVRRMILYORF6UxXbiOFsICkz0J9j1C0JUlCHv1tVJC',
  env: 'sandbox',
};

const App = () => {
  const [isLoadedSuccess, TapPay] = useTapPay(TAPPAY_CONFIG);

  return (
    <View>
      <DirectPay isLoadedSuccess={isLoadedSuccess} TapPay={TapPay} />
    </View>
  );
};

export default App;
