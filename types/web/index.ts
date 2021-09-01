import { GetCardPrime } from "./card";
import { GetLinePayPrime } from "./linePay";

export interface TapPayDirect {
  appID: string;
  setupSDK: Function;
  linePay: {
    getPrime: (callback: (result: GetLinePayPrime) => void) => void;
  };
  card: {
    setup: Function;
    onUpdate: Function;
    getPrime: (callback: (result: GetCardPrime) => void) => void;
  };
}
