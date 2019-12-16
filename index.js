import PropTypes from 'prop-types';
import { requireNativeComponent, ViewPropTypes, NativeModules } from 'react-native';

let directPayTPDFormProps = {
    name: 'DirectPayTPDForm',
    propTypes: {
        errorColor: PropTypes.string,
        ...ViewPropTypes,
    },
};

export const DirectPayTPDForm = requireNativeComponent('DirectPayTPDForm', directPayTPDFormProps);
export const DirectPayTPDSetup = NativeModules.DirectPayTPDSetup;

