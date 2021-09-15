import { GetCardPrime, UpdateCallback } from "./card";
import { GetLinePayPrime } from "./linePay";

export interface TapPayDirect {
  appID: string;
  setupSDK: Function;
  linePay: {
    getPrime: (callback: (result: GetLinePayPrime) => void) => void;
  };
  card: {
    setup: Function;
    onUpdate: (callback: UpdateCallback) => void;
    getPrime: (callback: (result: GetCardPrime) => void) => void;
  };
}
