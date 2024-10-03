import { useEffect, useMemo } from 'react';
import useScript from '../hooks/useScript';
import { TAP_PAY_SDK_PATH, TPDIframeId } from './constant';
import { TapPayMethods } from './TapPay';
const tpChecker = () => typeof window.TPDirect !== 'undefined';
export function useTapPay(args) {
    const { appId, appKey, env, rbaId, rbaKey } = args;
    const [isLoaded, hasError] = useScript(TAP_PAY_SDK_PATH, TPDIframeId, tpChecker);
    const isLoadedSuccess = isLoaded && !hasError;
    const tapPayInstance = useMemo(() => new TapPayMethods(isLoadedSuccess), [isLoadedSuccess]);
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
        }
        else {
            window.TPDirect.setupSDK(appId, appKey, env);
        }
    }, [isLoadedSuccess, appId, rbaId, rbaKey, appKey, env]);
    return [isLoadedSuccess, tapPayInstance];
}
