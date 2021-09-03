# react-native-tappay [![npm version](https://badge.fury.io/js/react-native-tappay.svg)](https://badge.fury.io/js/react-native-tappay) [![npm](https://img.shields.io/npm/dt/react-native-tappay.svg?style=flat-square)](https://www.npmjs.com/package/react-native-tappay)

[Tappay](https://www.tappaysdk.com/en) is a great payment service provider which provide many popular payment method.

[react-native-tappay](https://github.com/VeryBuy/react-native-tappay) is a wrapper around the [iOS Tappay SDK](https://github.com/TapPay/tappay-ios-example) and [Android Tappay SDK](https://github.com/TapPay/tappay-android-example), allowing for Tappay integration in React Native apps. Provided JS Code to call native functions.

This package aims to support functional usage [without Form](https://portal.tappaysdk.com/document/androidnoform). So you can custom your component/behavior or intergrate with other library as you want.

We use it in our product and we love to open source it ❤. 

# Tappay SDK support Version
* Web: [5.6.0]<https://github.com/TapPay/tappay-web-example/releases/tag/v5.6.0>
* Android: [3.3.0]https://github.com/TapPay/tappay-android-example/releases/tag/3.3.2>
* iOS: [2.11.1]<https://github.com/TapPay/tappay-ios-example/releases/tag/v2.11.0>

## Getting started

`$ npm install react-native-tappay --save`

or 

`$ yarn add react-native-tappay`

### React Native 0.60 and higher

On newer versions of React Native, linking is automatic.

### React Native 0.59 and lower

`$ react-native link react-native-tappay`

## Usage

### Currently supports RBA setup

#### without RBA

```javascript
import { useTapPay } from 'react-native-tappay';

function MyComponent() {
  const [isLoadedSuccess, TapPay] = useTapPay({ appId, appKey, env })

  return ...
}
```
#### with RBA

```javascript
import { useTapPay } from 'react-native-tappay';

function MyComponent() {
  const [isLoadedSuccess, TapPay] = useTapPay({ appId, appKey, env, rbaId, rbaKey })

  return ...
}
```

### Example
```javascript
TapPay.validateCard('4242424242424242', '01', '23', '123')
  .then(result => {
    console.log({
      "isCardNumberValid": result.isCardNumberValid,
      "isExpiredDateValid": result.isExpiredDateValid,
      "isCCVValid": result.isCCVValid,
      "cardType": result.cardType,
    });
  })
  .catch(error => {
    console.error(error);
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
      "cardidentifier":result.cardidentifier,
    });
  })
  .catch(error => {
    console.error(error);
  });
TapPay.removeCard();
```

## Props

Name   | Type     | Required
-------|----------|--------
appId  | `number` | YES
appKey | `string` | YES
env    | `string` | YES
rbaId  | `string` | NO
rbaKey | `string` | NO

## Methods

### validateCard
Parameters: `cardNumber: string, dueMonth: string, dueYear: string, CCV: string`<br>
Returns: `void`

### setCard
Parameters: `cardNumber: string, dueMonth: string, dueYear: string, CCV: string`<br>
Returns: `void`

### getDirectPayPrime
Parameters: `none`<br>
Returns: `Promise<GetCardPrimeResolveValue>`

[GetCardPrimeResolveValue](#getcardprimeresolvevalue)

### removeCard
Parameters: `none`<br>
Returns: `Promise<GetCardPrimeResolveValue>`

### getLinePayPrime
Parameters: `url: string`<br>
Returns: `Promise<{ prime: string | null }>`

### isLinePayAvailable
Parameters: `void`<br>
Returns: `Promise<boolean>`

### handleLinePayURL
Parameters: `url: string`<br>
Returns: `Promise<boolean>`

#### Types

##### GetCardPrimeResolveValue
Name                  | Type                          | Content
----------------------|-------------------------------|-----------------------------------------------------------------------------------
prime                 | `string`                      |
bincode               | `string`                      |
lastfour              | `string`                      |
issuer                | `string`                      |
funding               | `number`                      | -1 = Unknown<br>0 = Credit Card<br>1 = Debit Card<br>2 = Prepaid Card
type                  | `number`                      | -1 = Unknown<br>1 = VISA<br>2 = MasterCard<br>3 = JCB<br>4 = Union Pay<br>5 = AMEX
cardidentifier        | `string`                      |
merchantReferenceInfo | `{ affiliate_codes: Array }`  |

# Suppported Payment
 - [x] [Direct Pay](https://www.tappaysdk.com/en/payments/direct-pay)
 - [x] [Line Pay](https://www.tappaysdk.com/en/payments/line-pay)
 - [ ] [Apple Pay](https://www.tappaysdk.com/en/payments/apple-pay) TODO
 - [ ] [Google Pay](https://www.tappaysdk.com/en/payments/google-pay) PR Welcome
 - [ ] [Samsung Pay](https://www.tappaysdk.com/en/payments/samsung-pay) PR Welcome
