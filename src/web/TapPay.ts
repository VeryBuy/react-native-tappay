import { GetPrimeStatus } from '../types/common';
import { GetCardPrimeResolveValue, CardSetupArgs, UpdateCallback } from '../types/card';
import { TapPayDirect } from '../types/web';

declare global {
  interface Window {
    TPDirect: TapPayDirect;
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
  validateCard = (_cardNumber: string, _dueMonth: string, _dueYear: string, _CCV: string) => {
    return Promise.resolve();
  };

  // This method is worked on android or iOS.
  setCard = (_cardNumber: string, _dueMonth: string, _dueYear: string, _CCV: string) => {
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
}
