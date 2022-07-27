import { CartData, MerchantData } from '../types/applePay';
import {
  CardSetupArgs,
  GetCardPrimeResolveValue,
  UpdateCallback,
} from '../types/card';
import { GetPrimeStatus } from '../types/common';
import { TapPayDirect } from '../types/web';

declare global {
  interface Window {
    TPDirect: TapPayDirect;
    ApplePaySession: any;
  }
}

export class TapPayMethods {
  constructor(isLoadedSuccess: boolean) {
    this.isLoadedSuccess = isLoadedSuccess;
  }

  private isLoadedSuccess: boolean;

  cardSetup = (args: CardSetupArgs) => {
    window.TPDirect.card.setup(args);
  };

  // This method is worked on android or iOS.
  validateCard = (
    _cardNumber: string,
    _dueMonth: string,
    _dueYear: string,
    _CCV: string,
  ) => {
    return Promise.resolve();
  };

  // This method is worked on android or iOS.
  setCard = (
    _cardNumber: string,
    _dueMonth: string,
    _dueYear: string,
    _CCV: string,
  ) => {
    return;
  };

  onCardUpdate = (cb: UpdateCallback) => {
    window.TPDirect.card.onUpdate(cb);
  };

  getDirectPayPrime = () => {
    if (!this.isLoadedSuccess) {
      return Promise.reject('TapPay is not loaded or failed');
    }

    return new Promise<GetCardPrimeResolveValue>((resolve, reject) => {
      try {
        window.TPDirect.card.getPrime(result => {
          if (result.status !== GetPrimeStatus.Success) {
            return reject(result.msg);
          }

          const resolveValue = {
            prime: result.card.prime,
            bincode: result.card.bincode,
            lastfour: result.card.lastfour,
            issuer: result.card.issuer,
            type: result.card.type,
            funding: result.card.funding,
            cardidentifier: result.card_identifier,
            merchantReferenceInfo: result.merchant_reference_info,
          };

          resolve(resolveValue);
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  // This method is worked on android or iOS.
  removeCard = () => {
    return;
  };

  isLinePayAvailable = () => {
    return Promise.resolve(this.isLoadedSuccess);
  };

  getLinePayPrime = (_returnUrl: string) => {
    if (!this.isLoadedSuccess) {
      return Promise.reject('TapPay is not loaded or failed');
    }

    return new Promise<{ prime: string | null }>((resolve, reject) => {
      try {
        window.TPDirect.linePay.getPrime(result => {
          if (result.prime) {
            return resolve({ prime: result.prime });
          }

          reject({ message: 'prime is empty' });
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  // This method is used on android or iOS.
  handleLinePayURL = (_url: string) => {
    return Promise.resolve(true);
  };

  isApplePayAvailable = () => {
    return Promise.resolve(
      window.TPDirect.paymentRequestApi.checkAvailability(),
    );
  };

  getApplePayPrime = () => {
    console.warn(
      'You have to call webSetupApplePay and webGetApplePayPrime instead.',
    );

    return Promise.reject('Not Support on Web');
  };

  webSetupApplePay = (merchantData: MerchantData, cartData: CartData) => {
    window.TPDirect.paymentRequestApi.setupApplePay({
      merchantIdentifier: merchantData.merchantIdentifier,
      countryCode: merchantData.countryCode,
    });
    const data = {
      supportedNetworks: ['MASTERCARD', 'VISA', 'AMEX'],
      supportedMethods: ['apple_pay'],
      total: {
        label: merchantData.merchantName,
        amount: {
          currency: merchantData.currencyCode,
          value: cartData.reduce((prev, current) => current.price + prev, 0),
        },
      },
    };

    return new Promise<any>((resolve, reject) => {
      window.TPDirect.paymentRequestApi.setupPaymentRequest(data, result => {
        if (result.canMakePaymentError) {
          reject(result);
        } else {
          resolve(result);
        }
      });
    });
  };

  webGetApplePayPrime = () => {
    return new Promise<any>((resolve, reject) => {
      window.TPDirect.paymentRequestApi.getPrime(
        (result: { prime: string }) => {
          if (result?.prime) {
            resolve(result);
          } else {
            reject(result);
          }
        },
      );
    });
  };
}
