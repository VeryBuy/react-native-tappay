import { FC, useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import safeAwait from 'safe-await';

import { ComponentCommonProps } from '../../types/common';
import { CARD_FIELD_ID, cardSetupConfig } from './constants';

const DirectPay: FC<ComponentCommonProps> = props => {
  const { isLoadedSuccess, TapPay } = props;
  const [hasNumberError, setHasNumberError] = useState(false);
  const [hasExpirationDateError, setHasExpirationDateError] = useState(false);
  const [hasCCVError, setHasCCVError] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [cardInfo, setCardInfo] = useState({});

  const onSubmit = async () => {
    const [error, response] = await safeAwait(TapPay.getDirectPayPrime());

    if (error) {
      return;
    }

    setCardInfo(response);
  };

  useEffect(() => {
    if (!isLoadedSuccess) {
      return;
    }

    TapPay.cardSetup(cardSetupConfig);
    TapPay.onCardUpdate(update => {
      const { canGetPrime, status } = update;

      setHasNumberError(status.number === 2);
      setHasExpirationDateError(status.expiry === 2);
      setHasCCVError(status.ccv === 2);
      setIsValidated(canGetPrime);
    });
  }, [isLoadedSuccess, TapPay]);

  return (
    <View>
      <View
        style={[styles.input, hasNumberError && styles.inputWithError]}
        nativeID={`${CARD_FIELD_ID.number}`}
      />
      <View
        style={[styles.input, hasExpirationDateError && styles.inputWithError]}
        nativeID={`${CARD_FIELD_ID.expirationDate}`}
      />
      <View
        style={[styles.input, hasCCVError && styles.inputWithError]}
        nativeID={`${CARD_FIELD_ID.ccv}`}
      />
      <Button title="Submit" onPress={onSubmit} disabled={!isValidated} />
      <View>
        <Text>{JSON.stringify(cardInfo, null, 2)}</Text>
      </View>
    </View>
  );
};

export default DirectPay;

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E1E3E6',
    marginBottom: 5,
  },
  inputWithError: {
    borderColor: '#FC6068',
  },
});
