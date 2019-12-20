package tw.com.verybuy.directpay;

import android.graphics.Color;
import android.os.Handler;

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

    private static final String REACT_VIEW = "DirectPayTPDForm";

    private TPDCard tpdCard;
    private Handler getPrimeHandler = new Handler();
    private Runnable getPrimeRunnable = new Runnable() {
        @Override
        public void run() {
            if (null != tpdCard) {
                tpdCard.getPrime();
            }

        }
    };


    @Override
    public String getName() {
        return REACT_VIEW;
    }

    @Override
    public TPDForm createViewInstance(final ThemedReactContext reactContext) {

        final TPDForm tpdform = new TPDForm(reactContext);

        setFormUpdateListener(reactContext, tpdform);

        setTPDCardConfig(reactContext, tpdform);

        return tpdform;
    }

    private void setFormUpdateListener(final ReactContext reactContext, final TPDForm tpdform) {
        tpdform.setOnFormUpdateListener(new TPDFormUpdateListener() {
            @Override
            public void onFormUpdated(TPDStatus tpdStatus) {
                WritableMap event = Arguments.createMap();
                event.putBoolean("isEnable", tpdStatus.isCanGetPrime());
                reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                        tpdform.getId(), "topChange", event);

                if (tpdStatus.isCanGetPrime()) {
                    tpdCard.getPrime();
                }
            }
        });
    }

    private void setTPDCardConfig(final ReactContext reactContext, final TPDForm tpdform) {
        tpdCard = TPDCard
                .setup(tpdform)
                .onSuccessCallback(new TPDCardTokenSuccessCallback() {
                    @Override
                    public void onSuccess(String token, TPDCardInfo tpdCardInfo, String cardIdentifier) {
                        WritableMap event = Arguments.createMap();
                        event.putBoolean("tpdCardStatus", true);
                        event.putString("tpdCardToken", token);
                        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                                tpdform.getId(), "topChange", event);

                        // Workaround to renew token per 20 seconds
                        getPrimeHandler.postDelayed(getPrimeRunnable, 20000);

                    }
                })
                .onFailureCallback(new TPDTokenFailureCallback() {
                    @Override
                    public void onFailure(int status, String reportMsg) {
                        WritableMap event = Arguments.createMap();
                        event.putBoolean("tpdCardStatus", false);
                        event.putString("errorMessage", reportMsg);
                        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                                tpdform.getId(), "topChange", event);

                    }
                });


    }

    @ReactProp(name = "errorColor", customType = "#FF0000")
    public void setTextErrorColor(TPDForm tpdform, String errorColorStr) {
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

        // Initial Direct Pay Config

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


    @Override
    public void onDropViewInstance(TPDForm view) {
        super.onDropViewInstance(view);
        getPrimeHandler.removeCallbacks(getPrimeRunnable);
    }

}
