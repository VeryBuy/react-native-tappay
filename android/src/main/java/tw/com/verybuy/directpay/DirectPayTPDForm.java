package tw.com.verybuy.directpay;

import android.graphics.Color;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import tech.cherri.tpdirect.api.TPDCard;
import tech.cherri.tpdirect.api.TPDCardInfo;
import tech.cherri.tpdirect.api.TPDForm;
import tech.cherri.tpdirect.api.TPDServerType;
import tech.cherri.tpdirect.api.TPDSetup;
import tech.cherri.tpdirect.callback.TPDCardTokenSuccessCallback;
import tech.cherri.tpdirect.callback.TPDFormUpdateListener;
import tech.cherri.tpdirect.callback.TPDTokenFailureCallback;
import tech.cherri.tpdirect.model.TPDStatus;



public class DirectPayTPDForm extends SimpleViewManager<TPDForm> {

    private static final String TAG = "DirectPayTPDForm";
    private static final String REACT_VIEW = "DirectPayTPDForm";
    private TPDCard tpdCard;

    @Override
    public String getName() {
        return REACT_VIEW;
    }

    @Override
    public TPDForm createViewInstance(final ThemedReactContext reactContext) {
        Log.d(TAG, "createViewInstance() called with: reactContext = [" + reactContext + "]");

        final TPDForm tpdform = new TPDForm(reactContext);

        onReceiveNativeEvent(reactContext, tpdform);

        tpdCard = TPDCard
                .setup(tpdform)
                .onSuccessCallback(new TPDCardTokenSuccessCallback() {
                    @Override
                    public void onSuccess(String s, TPDCardInfo tpdCardInfo, String s1) {
                        Log.d(TAG, "onSuccess() called with: s = [" + s + "], tpdCardInfo = [" + tpdCardInfo + "], s1 = [" + s1 + "]");
                    }
                })
                .onFailureCallback(new TPDTokenFailureCallback() {
                    @Override
                    public void onFailure(int i, String s) {
                        Log.d(TAG, "onFailure() called with: i = [" + i + "], s = [" + s + "]");
                    }
                });

        return tpdform;
    }

    @ReactProp(name = "errorColor", customType = "#FF0000")
    public void setTextErrorColor(TPDForm tpdform, String errorColorStr) {
        Log.d(TAG, "setTextErrorColor() called with: tpdform = [" + tpdform + "], errorColorStr = [" + errorColorStr + "]");
        int errorColor;
        try {
            errorColor = Color.parseColor(errorColorStr);
        } catch (NumberFormatException e) {
            errorColor = Color.RED;
            e.printStackTrace();
        }

        tpdform.setTextErrorColor(errorColor);
    }

    @ReactProp(name = "isProduction")
    public void setIsProduction(TPDForm tpdForm, boolean isProduction) {
        ReactContext context = (ReactContext) tpdForm.getContext();
       if (isProduction) {
           TPDSetup.initInstance(context,
                   Integer.parseInt(context.getString(R.string.direct_pay_id)) ,
                   context.getString(R.string.direct_pay_key_production)
                   , TPDServerType.Production);

       } else {
           TPDSetup.initInstance(context,
                   Integer.parseInt(context.getString(R.string.direct_pay_id)) ,
                   context.getString(R.string.direct_pay_key_sandbox)
                   , TPDServerType.Sandbox);

       }
    }

    private void onReceiveNativeEvent(final ReactContext reactContext, final TPDForm tpdform) {
        tpdform.setOnFormUpdateListener(new TPDFormUpdateListener() {
            @Override
            public void onFormUpdated(TPDStatus tpdStatus) {
                WritableMap event = Arguments.createMap();
                event.putString("isEnable", String.valueOf(tpdStatus.isCanGetPrime()));
                reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                        tpdform.getId(), "topChange", event);

                if (tpdStatus.isCanGetPrime()) {
                    tpdCard.getPrime();
                }
            }
        });
        }

}
