import PropTypes from 'prop-types';
import { requireNativeComponent, ViewPropTypes } from 'react-native';

let directPayProps = {
    name: 'DirectPay',
    propTypes: {
        // color: PropTypes.string,
        text: PropTypes.string,
        ...ViewPropTypes,
    },
};

const DirectPay = requireNativeComponent('DirectPay', directPayProps);

export default DirectPay;
