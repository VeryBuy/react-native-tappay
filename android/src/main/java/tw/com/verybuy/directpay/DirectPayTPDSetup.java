package tw.com.verybuy.directpay;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableNativeMap;
import com.facebook.react.uimanager.ThemedReactContext;

import tech.cherri.tpdirect.api.TPDCard;
import tech.cherri.tpdirect.api.TPDServerType;
import tech.cherri.tpdirect.api.TPDSetup;

public class DirectPayTPDSetup extends ReactContextBaseJavaModule {

    private static final String REACT_VIEW = "DirectPayTPDSetup";
    private static final String TAG = "DirectPayTPDSetup";
    private ReactApplicationContext reactContext;

    public DirectPayTPDSetup(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return REACT_VIEW;
    }

    @ReactMethod
    public void initialDirectPay(int appID, String appKey, boolean isProduction) {

        TPDServerType tpdServerType = isProduction ? TPDServerType.Production : TPDServerType.Sandbox;
        TPDSetup.initInstance(reactContext, appID, appKey, tpdServerType);
    }


}
