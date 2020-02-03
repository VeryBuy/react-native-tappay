import React, { Component } from "react";
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

const CardView = requireNativeComponent('TPDCardView');

export class TPDCardView extends Component {
    _onUpdate = (event) => {
        if (!this.props.onUpdate) {
            return ;
        }

        this.props.onUpdate(event.nativeEvent.canGetPrime);
    }

    render() {
        return (
            <CardView
                {...this.props}
                onUpdate={this._onUpdate}
            />
        )
    }
}

TPDCardView.propTypes = {
    errorColor: PropTypes.string,
    okColor: PropTypes.string,
    normalColor: PropTypes.string,
    onUpdate: PropTypes.func
};

export const TapPay = NativeModules.TapPay;
