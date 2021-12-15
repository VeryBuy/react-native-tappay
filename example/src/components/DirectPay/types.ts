import { TapPayInstance } from 'react-native-tappay';

export interface Props {
  isLoadedSuccess: boolean;
  TapPay: TapPayInstance;
}

export type AppCardInfo = {
  valid: boolean;
  values: Record<'cvc' | 'expiry' | 'number' | 'type', string>;
  prime?: string;
};
