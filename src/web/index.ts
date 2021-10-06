import { useEffect, useMemo } from "react";

import { TPDIframeId, TAP_PAY_SDK_PATH } from "./constant";
import { SetupArgs, UseTapPay } from "../types/TapPayInstance";
import useScript from "../hooks/useScript";
import { TapPayMethods } from "./TapPay";

const tpChecker = () => typeof window.TPDirect !== "undefined";

export function useTapPay(args: SetupArgs): UseTapPay {
  const { appId, appKey, env, rbaId, rbaKey } = args;
  const [isLoaded, hasError] = useScript(
    TAP_PAY_SDK_PATH,
    TPDIframeId,
    tpChecker
  );
  const isLoadedSuccess = isLoaded && !hasError;
  const tapPayInstance = useMemo(
    () => new TapPayMethods(isLoadedSuccess),
    [isLoadedSuccess]
  );

  useEffect(() => {
    if (!isLoadedSuccess) {
      return;
    }

    if (rbaId && rbaKey) {
      window.TPDirect.setupSDK({
        tappayAppId: appId,
        tappayAppKey: appKey,
        rbaAppId: rbaId,
        rbaAppKey: rbaKey,
        env,
      });
    } else {
      window.TPDirect.setupSDK(appId, appKey, env);
    }
  }, [isLoadedSuccess]);

  return [isLoadedSuccess, tapPayInstance];
}
