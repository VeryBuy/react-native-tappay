import React from "react";
import PropTypes from 'prop-types';
import { 
    requireNativeComponent, 
    ViewPropTypes, 
    NativeModules 
} from 'react-native';

let directPayTPDFormProps = {
    name: 'DirectPayTPDForm',
    propTypes: {
        errorColor: PropTypes.string,
        isProduction: PropTypes.bool,
        ...ViewPropTypes,
    },
};

export const DirectPayTPDForm = requireNativeComponent('DirectPayTPDForm', directPayTPDFormProps);

export const TPDCardView = requireNativeComponent('TPDCardView');
export const TapPay = NativeModules.TapPay;
