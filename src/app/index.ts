import { useEffect } from 'react';
import { NativeModules } from 'react-native';

import { SetupArgs, UseTapPay } from '../types/TapPayInstance';

const { TapPay } = NativeModules;

export function useTapPay(args: SetupArgs): UseTapPay {
  const { appId, appKey, env, rbaId, rbaKey } = args;
  const { setup, setupWithRBA, ...restTapPayMethods } = TapPay;

  // This method is worked on Web
  TapPay.onCardUpdate = _cb => {
    //
  };
  TapPay.cardSetup = _args => {
    //
  };

  useEffect(() => {
    if (rbaId && rbaKey) {
      setupWithRBA(appId, appKey, rbaId, rbaKey, env);
    } else {
      setup(appId, appKey, env);
    }
  }, [appId, appKey, env, rbaId, rbaKey, setup, setupWithRBA]);

  return [true, restTapPayMethods];
}
