import type { CartData, MerchantData } from './applePay';
import {
  CardSetupArgs,
  GetCardPrimeResolveValue,
  UpdateCallback,
} from './card';
export type { MerchantData, CartData } from './applePay';
export interface SetupArgs {
  appId: number;
  appKey: string;
  env: string;
  rbaId?: string;
  rbaKey?: string;
}

type IsLoadedSuccess = boolean;

export type UseTapPay = [IsLoadedSuccess, TapPayInstance];

export default interface TapPayInstance {
  cardSetup: (args: CardSetupArgs) => void;
  validateCard: (
    cardNumber: string,
    dueMonth: string,
    dueYear: string,
    CCV: string,
  ) => Promise<any>;
  setCard: (
    cardNumber: string,
    dueMonth: string,
    dueYear: string,
    CCV: string,
  ) => void;
  onCardUpdate: (cb: UpdateCallback) => void;
  getDirectPayPrime: () => Promise<GetCardPrimeResolveValue>;
  removeCard: () => void;
  getLinePayPrime: (returnUrl: string) => Promise<{ prime: string | null }>;
  isLinePayAvailable: () => Promise<boolean>;
  handleLinePayURL: (url: string) => Promise<boolean>;
  isApplePayAvailable: () => Promise<boolean>;
  getApplePayPrime: (
    merchantData: MerchantData,
    cartData: CartData,
  ) => Promise<{ prime: string | null }>;
  webSetupApplePay: (
    merchantData: MerchantData,
    cartData: CartData,
  ) => Promise<any>;
  webGetApplePayPrime: () => Promise<{ prime: string | null }>;
}
