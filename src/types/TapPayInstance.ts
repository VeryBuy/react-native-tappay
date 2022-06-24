import {
  CardSetupArgs,
  GetCardPrimeResolveValue,
  UpdateCallback,
} from './card';

export interface SetupArgs {
  appId: number;
  appKey: string;
  env: string;
  rbaId?: string;
  rbaKey?: string;
}
export interface MerchantData {
  merchantName: string;
  merchantIdentifier: string;
  countryCode: string;
  currencyCode: string;
}
export interface ShippingData {
  identifier: string;
  detail: string;
  amount: number;
  label: string;
}
export interface CartItem {
  itemName: string;
  count: number;
  price: number;
}
export type CartData = Array<CartItem>;

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
    shippingData: ShippingData,
    cartData: CartData,
  ) => void;
}
