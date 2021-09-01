import { GetCardPrimeResolveValue } from "./card";

export default interface TapPayInstance {
  setup: (appId: number, appKey: string, env: string) => void;
  setupWithRBA: (
    appId: number,
    appKey: string,
    rbaId: string,
    rbaKey: string,
    env: string
  ) => void;
  validateCard: (
    cardNumber: string,
    dueMonth: string,
    dueYear: string,
    CCV: string
  ) => Promise<any>;
  setCard: (
    cardNumber: string,
    dueMonth: string,
    dueYear: string,
    CCV: string
  ) => void;
  getDirectPayPrime: () => Promise<GetCardPrimeResolveValue>;
  removeCard: () => void;
  getLinePayPrime: (returnUrl: string) => Promise<{ prime: string | null }>;
  isLinePayAvailable: () => Promise<boolean>;
  handleLinePayURL: (url: string) => Promise<boolean>;
  isLoadSuccess: boolean;
}
