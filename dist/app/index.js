import { useEffect } from 'react';
import { NativeModules, Platform } from 'react-native';
const { TapPay } = NativeModules;
export function useTapPay(args) {
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
        if (Platform.OS !== 'ios' && rbaId && rbaKey) {
            setupWithRBA(appId, appKey, rbaId, rbaKey, env);
        }
        else {
            setup(appId, appKey, env);
        }
    }, [appId, appKey, env, rbaId, rbaKey, setup, setupWithRBA]);
    return [true, restTapPayMethods];
}
