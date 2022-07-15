import { CardSetupArgs, GetCardPrime, UpdateCallback } from './card';
import { GetLinePayPrime } from './linePay';

export interface TapPayDirect {
  paymentRequestApi: {
    setupApplePay: Function;
    setupPaymentRequest: Function;
    getPrime: Function;
    checkAvailability: Function;
  };
  appID: string;
  setupSDK: Function;
  linePay: {
    getPrime: (callback: (result: GetLinePayPrime) => void) => void;
  };
  card: {
    setup: (args: CardSetupArgs) => void;
    onUpdate: (callback: UpdateCallback) => void;
    getPrime: (callback: (result: GetCardPrime) => void) => void;
  };
}
