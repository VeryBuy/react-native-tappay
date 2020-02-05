import React, { Component } from "react";
import PropTypes from 'prop-types';
import { 
    requireNativeComponent,
    NativeModules
} from 'react-native';

const DirectPayForm = requireNativeComponent('DirectPayTPDForm');

export class DirectPayTPDForm extends Component {
    _onChange = (event) => {
        if (!this.props.onChange) {
            return ;
        }

        this.props.onChange(event);
    }

    render() {
        return (
            <DirectPayForm 
                {...this.props}
                onChange={this._onChange}   // Android form update event
                onUpdate={this._onChange}   // iOS form update event
            />
        )
    }
}

DirectPayTPDForm.propTypes = {
    errorColor: PropTypes.string,
    okColor: PropTypes.string,      // Only iOS support
    normalColor: PropTypes.string,  // Only iOS support
    isProduction: PropTypes.bool,   // Only Android support
    onChange: PropTypes.func
}

export const TapPay = NativeModules.TapPay;     // Only iOS support
