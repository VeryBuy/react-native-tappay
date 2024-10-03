import { CartData, MerchantData } from '../types/applePay';
import { CardSetupArgs, GetCardPrimeResolveValue, UpdateCallback } from '../types/card';
import { TapPayDirect } from '../types/web';
declare global {
    interface Window {
        TPDirect: TapPayDirect;
        ApplePaySession: any;
    }
}
export declare class TapPayMethods {
    constructor(isLoadedSuccess: boolean);
    private isLoadedSuccess;
    cardSetup: (args: CardSetupArgs) => void;
    validateCard: (_cardNumber: string, _dueMonth: string, _dueYear: string, _CCV: string) => Promise<void>;
    setCard: (_cardNumber: string, _dueMonth: string, _dueYear: string, _CCV: string) => void;
    onCardUpdate: (cb: UpdateCallback) => void;
    getDirectPayPrime: () => Promise<GetCardPrimeResolveValue>;
    removeCard: () => void;
    isLinePayAvailable: () => Promise<boolean>;
    getLinePayPrime: (_returnUrl: string) => Promise<{
        prime: string | null;
    }>;
    handleLinePayURL: (_url: string) => Promise<boolean>;
    isApplePayAvailable: () => Promise<any>;
    getApplePayPrime: () => Promise<never>;
    webSetupApplePay: (merchantData: MerchantData, cartData: CartData) => Promise<any>;
    webGetApplePayPrime: () => Promise<any>;
}
