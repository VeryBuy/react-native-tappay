import React, { VFC, useCallback } from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleSheet,
  Text,
} from 'react-native';

interface Props extends PressableProps {
  text: string;
  disabled?: boolean;
  isLoading?: boolean;
}

const Button: VFC<Props> = props => {
  const {
    text,
    isLoading = false,
    disabled = false,
    onPress,
    ...pressableProps
  } = props;
  const pressableStyle = useCallback(
    ({ pressed }: PressableStateCallbackType) => [
      {
        opacity: pressed ? 0.5 : 1,
      },
      styles.button,
    ],
    [],
  );

  return (
    <Pressable
      {...pressableProps}
      onPress={onPress}
      style={pressableStyle}
      disabled={disabled || isLoading}
    >
      <Text>{text}</Text>
      {isLoading && <ActivityIndicator style={styles.activityIndicator} />}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    borderRadius: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicator: {
    marginLeft: 10,
  },
});
