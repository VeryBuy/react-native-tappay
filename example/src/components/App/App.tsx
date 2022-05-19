import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import { useTapPay } from 'react-native-tappay';

import PayBy from '../../constants/PayBy';
import TAPPAY_CONFIG from '../../constants/TapPayConfig';
import DirectPay from '../DirectPay';
import LINEPay from '../LINEPay';

const radioProps = Object.values(PayBy).map(pay => ({
  label: pay,
  value: pay,
}));

const App = () => {
  const [isLoadedSuccess, TapPay] = useTapPay(TAPPAY_CONFIG);
  const [payBy, setPayBy] = useState(PayBy.DirectPay);

  if (!isLoadedSuccess) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const renderPayment = () => {
    const props = { isLoadedSuccess, TapPay };

    switch (payBy) {
      case PayBy.LINEPay: {
        return <LINEPay {...props} />;
      }
      case PayBy.DirectPay:
      default: {
        return <DirectPay {...props} />;
      }
    }
  };

  return (
    <View style={styles.container}>
      <RadioForm
        formHorizontal
        style={styles.radioStyle}
        labelStyle={styles.radioLabelStyle}
        radio_props={radioProps}
        initial={0}
        onPress={setPayBy}
      />
      {renderPayment()}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  radioStyle: {
    marginBottom: 10,
  },
  radioLabelStyle: {
    marginRight: 10,
  },
});
