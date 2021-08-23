# react-native-tappay

## Getting started

`$ npm install react-native-tappay --save`

or 

`$ yarn add react-native-tappay`

### Mostly automatic installation in react-native < 0.60

`$ react-native link react-native-tappay`

## Usage
```javascript
TapPay.setup(appID, appKey, 'sandbox');
TapPay.validateCard('4242424242424242', '01', '23', '123')
  .then(result => {
    console.log({
      "isCardNumberValid": result.isCardNumberValid,
      "isExpiredDateValid": result.isExpiredDateValid,
      "isCCVValid": result.isCCVValid,
      "cardType": result.cardType 
    });
    showToast(JSON.stringify(result));
  })
  .catch(err => {
    console.error(err);
    showToast('validate error');
  });
TapPay.setCard('4242424242424242', '01', '23', '123');
TapPay.getDirectPayPrime()
  .then(result => {
    console.log({
      "prime": result.prime,
      "bincode": result.bincode,
      "lastfour": result.lastfour,
      "issuer": result.issuer,
      "type": result.type,
      "funding": result.funding,
      "cardidentifier":result.cardidentifier 
    });
    showToast(JSON.stringify(result));
  })
  .catch(e => {
    console.error(e);
    showToast('getPrime error');
  });
TapPay.removeCard();
```
