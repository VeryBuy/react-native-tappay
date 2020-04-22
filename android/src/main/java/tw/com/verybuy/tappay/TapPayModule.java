package tw.com.verybuy.tappay;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.IllegalViewOperationException;




import tech.cherri.tpdirect.api.TPDCard;
import tech.cherri.tpdirect.api.TPDCardInfo;
import tech.cherri.tpdirect.api.TPDCardValidationResult;
import tech.cherri.tpdirect.api.TPDSetup;
import tech.cherri.tpdirect.api.TPDServerType;
import tech.cherri.tpdirect.callback.TPDCardTokenSuccessCallback;
import tech.cherri.tpdirect.callback.TPDTokenSuccessCallback;
import tech.cherri.tpdirect.callback.TPDTokenFailureCallback;



public class TapPayModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private TPDCard tpdCard;

    public TapPayModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "TapPay";
    }

    @ReactMethod
    public void setup(int appID, String appKey, String serverTypeString) {

        TPDServerType serverType = (serverTypeString == "production") ? TPDServerType.Production : TPDServerType.Sandbox;

        TPDSetup.initInstance(this.reactContext,
                appID,
                appKey,
                serverType);
    }

    @ReactMethod
    public void validateCard(String cardNumber, String dueMonth, String dueYear, String CCV, Promise promise) {

        try {

            TPDCardValidationResult result = TPDCard.validate(
                    new StringBuffer(cardNumber),
                    new StringBuffer(dueMonth),
                    new StringBuffer(dueYear),
                    new StringBuffer(CCV));

            WritableMap map = Arguments.createMap();
            map.putBoolean("isCardNumberValid", result.isCardNumberValid());
            map.putBoolean("isExpiryDateValid", result.isExpiryDateValid());
            map.putBoolean("isCCVValid", result.isCCVValid());
            // map.putBoolean("getCardType", result.getCardType());

            if (result.isCardNumberValid() && result.isExpiryDateValid() && result.isCCVValid()) {

                promise.resolve(map);
            } else {
                promise.reject("invalid", map);
            }

        } catch (IllegalViewOperationException e) {
            promise.reject("TPDCard.validate Error", e);
        }


    }

    @ReactMethod
    public void setCard(String cardNumber, String dueMonth, String dueYear, String CCV, Promise promise) {


        this.tpdCard = new TPDCard(this.reactContext,
                new StringBuffer(cardNumber),
                new StringBuffer(dueMonth),
                new StringBuffer(dueYear),
                new StringBuffer(CCV));
    }

    @ReactMethod
    public void removeCard() {
        this.tpdCard = null;
    }


    @ReactMethod
    public void getDirectPayPrime(final Promise promise) {

        if (null != this.tpdCard) {
            try {
                this.tpdCard.onSuccessCallback(new TPDCardTokenSuccessCallback() {
                    @Override
                    public void onSuccess(String token, TPDCardInfo tpdCardInfo, String cardIdentifier) {
                        String cardLastFour = tpdCardInfo.getLastFour();
                        WritableMap map = Arguments.createMap();
                        map.putString("prime", token);
                        map.putString("binCode", tpdCardInfo.getBincode());
                        map.putString("lastFour", tpdCardInfo.getLastFour());
                        map.putString("issuer", tpdCardInfo.getIssuer());
                        map.putInt("cardType", tpdCardInfo.getCardType());
                        map.putInt("funding", tpdCardInfo.getFunding());
                        map.putString("cardIdentifier", cardIdentifier);
                        promise.resolve(map);
                    }
                }).onFailureCallback(new TPDTokenFailureCallback() {
                    @Override
                    public void onFailure(int status, String reportMsg) {
                        //Failure
                        promise.reject(String.valueOf(status), reportMsg);
                    }
                }).createToken("UNKNOWN");
            } catch (IllegalViewOperationException e) {
                promise.reject("TPDCard.createToken Error", e);
            }
        }
    }

}
