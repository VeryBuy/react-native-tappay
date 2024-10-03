import { GetPrimeStatus } from '../types/common';
export class TapPayMethods {
    constructor(isLoadedSuccess) {
        this.isLoadedSuccess = isLoadedSuccess;
    }
    isLoadedSuccess;
    cardSetup = (args) => {
        window.TPDirect.card.setup(args);
    };
    // This method is worked on android or iOS.
    validateCard = (_cardNumber, _dueMonth, _dueYear, _CCV) => {
        return Promise.resolve();
    };
    // This method is worked on android or iOS.
    setCard = (_cardNumber, _dueMonth, _dueYear, _CCV) => {
        return;
    };
    onCardUpdate = (cb) => {
        window.TPDirect.card.onUpdate(cb);
    };
    getDirectPayPrime = () => {
        if (!this.isLoadedSuccess) {
            return Promise.reject('TapPay is not loaded or failed');
        }
        return new Promise((resolve, reject) => {
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
            }
            catch (error) {
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
    getLinePayPrime = (_returnUrl) => {
        if (!this.isLoadedSuccess) {
            return Promise.reject('TapPay is not loaded or failed');
        }
        return new Promise((resolve, reject) => {
            try {
                window.TPDirect.linePay.getPrime(result => {
                    if (result.prime) {
                        return resolve({ prime: result.prime });
                    }
                    reject({ message: 'prime is empty' });
                });
            }
            catch (error) {
                reject(error);
            }
        });
    };
    // This method is used on android or iOS.
    handleLinePayURL = (_url) => {
        return Promise.resolve(true);
    };
    isApplePayAvailable = () => {
        return Promise.resolve(window.TPDirect.paymentRequestApi.checkAvailability());
    };
    getApplePayPrime = () => {
        console.warn('You have to call webSetupApplePay and webGetApplePayPrime instead.');
        return Promise.reject('Not Support on Web');
    };
    webSetupApplePay = (merchantData, cartData) => {
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
        return new Promise((resolve, reject) => {
            window.TPDirect.paymentRequestApi.setupPaymentRequest(data, result => {
                if (result.canMakePaymentError) {
                    reject(result);
                }
                else {
                    resolve(result);
                }
            });
        });
    };
    webGetApplePayPrime = () => {
        return new Promise((resolve, reject) => {
            window.TPDirect.paymentRequestApi.getPrime((result) => {
                if (result?.prime) {
                    resolve(result);
                }
                else {
                    reject(result);
                }
            });
        });
    };
}
