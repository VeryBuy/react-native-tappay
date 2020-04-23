# react-native-tap-pay

## Getting started

`$ npm install react-native-tap-pay --save`

### Mostly automatic installation

`$ react-native link react-native-tap-pay`

## Usage
```javascript
	TapPay.setup(appID, appKey, 'sandbox');
    TapPay.validateCard('4242424242424242', '01', '23', '123')
      .then(result => {
        showToast(JSON.stringify(result));
      })
      .catch(err => {
        console.error(err);
        showToast('validate error');
      });
    TapPay.setCard('4242424242424242', '01', '23', '123');
    TapPay.getDirectPayPrime()
      .then(result => {
        showToast(JSON.stringify(result));
      })
      .catch(e => {
        console.error(e);
        showToast('getPrime error');
      });
    TapPay.removeCard();
```
