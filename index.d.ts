export interface TapPayInstance {
  setup: (appId: number, appKey: string, env: string) => void;
  validateCard: (
    cardNumber: string,
    dueMonth: string,
    dueYear: string,
    CCV: string
  ) => Promise;
  setCard: (
    cardNumber: string,
    dueMonth: string,
    dueYear: string,
    CCV: string
  ) => void;
  getDirectPayPrime: () => Promise;
  removeCard: () => void;
}

declare const TapPay: TapPayInstance;

export default TapPay;
