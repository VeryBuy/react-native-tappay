package tw.com.verybuy.directpay;

import android.graphics.Color;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import tech.cherri.tpdirect.api.TPDForm;

public class DirectPayTPDForm extends SimpleViewManager<TPDForm> {

    private static final String REACT_VIEW = "DirectPayTPDForm";

    @Override
    public String getName() {
        return REACT_VIEW;
    }

    @Override
    public TPDForm createViewInstance(ThemedReactContext reactContext) {
        return new TPDForm(reactContext);
    }

    @ReactProp(name = "errorColor")
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
}
