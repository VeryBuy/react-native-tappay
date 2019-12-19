import React from "react";
import PropTypes from 'prop-types';
import { requireNativeComponent, ViewPropTypes } from 'react-native';

let directPayTPDFormProps = {
    name: 'DirectPayTPDForm',
    propTypes: {
        errorColor: PropTypes.string,
        isProduction: PropTypes.bool,
        ...ViewPropTypes,
    },
};

export const DirectPayTPDForm = requireNativeComponent('DirectPayTPDForm', directPayTPDFormProps);

