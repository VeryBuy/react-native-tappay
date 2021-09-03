import { useEffect } from "react";

import { NativeModules } from "react-native";
import { SetupArgs, UseTapPay } from "../types/TapPayInstance";

const { TapPay } = NativeModules;

export function useTapPay(args: SetupArgs): UseTapPay {
  const { appId, appKey, env, rbaId, rbaKey } = args;
  const { setup, setupWithRBA, ...restTapPayMethods } = TapPay;

  useEffect(() => {
    if (rbaId && rbaKey) {
      setupWithRBA(appId, appKey, rbaId, rbaKey, env);
    } else {
      setup(appId, appKey, env);
    }
  }, []);

  return [true, restTapPayMethods];
}
