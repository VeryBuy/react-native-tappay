package tw.com.verybuy.directpay;

import android.graphics.Color;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import tech.cherri.tpdirect.api.TPDForm;
import tech.cherri.tpdirect.callback.TPDFormUpdateListener;

public class DirectPayManager extends SimpleViewManager<TPDForm> {

    private static final String REACT_VIEW = "DirectPay";

    @Override
    public String getName() {
        return REACT_VIEW;
    }

    @Override
    public TPDForm createViewInstance(ThemedReactContext reactContext) {
        return new TPDForm(reactContext);
    }

    @ReactProp(name = "color", defaultInt = Color.RED)
    public void setTextErrorColor(TPDForm tpdform, int color) {
        tpdform.setTextErrorColor(color);
    }
}
