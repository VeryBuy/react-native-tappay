import { TPDIframeId, TAP_PAY_SDK_PATH } from "./constant";
import { TapPayDirect } from "../types/web";
import { Status } from "../types/common";
import { GetCardPrimeResolveValue } from "../types/card";

declare global {
  interface Window {
    TPDirect: TapPayDirect;
  }
}

class TapPayMethods {
  private _isLoaded = false;
  private _hasError = false;
  private _hasBeenFetchedScript = false;

  private _appendScript = () => {
    return new Promise<void>((resolve, reject) => {
      if (this._hasBeenFetchedScript) {
        resolve();
      } else {
        this._hasBeenFetchedScript = true;

        const script = document.createElement("script");
        const scriptLoaded = () => {
          this._isLoaded = true;
          this._hasError = false;
          resolve();
        };
        const scriptLoadFail = () => {
          this._isLoaded = true;
          this._hasError = true;
          this._hasBeenFetchedScript = false;
          script.remove();
          reject();
        };

        script.src = TAP_PAY_SDK_PATH;
        script.async = true;
        script.addEventListener("load", scriptLoaded);
        script.addEventListener("error", scriptLoadFail);
        document.body.appendChild(script);
      }
    });
  };

  private _setup = (appId: number, setupFunc: () => void) => {
    this._appendScript().then(() => {
      const isTPDirectSetup = typeof window.TPDirect !== "undefined";

      if (isTPDirectSetup && +window.TPDirect.appID !== appId) {
        setupFunc();

        const TAPIframe = window.document.querySelectorAll(
          `[data-id=${TPDIframeId}]`
        );

        if (TAPIframe.length > 1) {
          TAPIframe[0].remove();
        }
      }
    });
  };

  get isLoadSuccess() {
    return this._isLoaded && !this._hasError;
  }

  setup = (appId: number, appKey: string, env: string) => {
    if (!appId || !appKey || !env) {
      return;
    }

    const setupFunc = () => window.TPDirect.setupSDK(appId, appKey, env);

    this._setup(appId, setupFunc);
  };

  setupWithRBA = (
    appId: number,
    appKey: string,
    rbaId: string,
    rbaKey: string,
    env: string
  ) => {
    if (!appId || !appKey || !env || !rbaKey || !env) {
      return;
    }

    const setupFunc = () => {
      window.TPDirect.setupSDK({
        tappayAppId: appId,
        tappayAppKey: appKey,
        rbaAppId: rbaId,
        rbaAppKey: rbaKey,
        env,
      });
    };

    this._setup(appId, setupFunc);
  };

  // This method is worked on android or iOS.
  validateCard = (
    _cardNumber: string,
    _dueMonth: string,
    _dueYear: string,
    _CCV: string
  ) => {
    return Promise.resolve();
  };

  // This method is worked on android or iOS.
  setCard = (
    _cardNumber: string,
    _dueMonth: string,
    _dueYear: string,
    _CCV: string
  ) => {
    return;
  };

  getDirectPayPrime = () => {
    return new Promise<GetCardPrimeResolveValue>((resolve, reject) => {
      try {
        window.TPDirect.card.getPrime((result) => {
          if (result.status !== Status.Success) {
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
    return Promise.resolve(this.isLoadSuccess);
  };

  getLinePayPrime = (_returnUrl: string) => {
    return new Promise<{ prime: string | null }>((resolve, reject) => {
      try {
        window.TPDirect.linePay.getPrime((result) => {
          if (result.prime) {
            return resolve({ prime: result.prime });
          }

          reject({ message: "prime is empty" });
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

export default new TapPayMethods();
