# react-native-tappay [![react-native-tappay is released under the MIT license.](https://img.shields.io/badge/license-MIT-blue.svg)](ttps://github.com/VeryBuy/react-native-tappay/blob/HEAD/LICENSE) [![npm version](https://badge.fury.io/js/react-native-tappay.svg)](https://badge.fury.io/js/react-native-tappay) [![npm](https://img.shields.io/npm/dt/react-native-tappay.svg?style=flat-square)](https://www.npmjs.com/package/react-native-tappay)

### Write once, run everywhere

[Tappay](https://www.tappaysdk.com/en) is a great payment service provider which provide many popular payment method. We want to write once and run everywhere(Web/Android/iOS).

<img src="https://bingo.d.pr/8To8My.png" width="180">

[react-native-tappay](https://github.com/VeryBuy/react-native-tappay) is a wrapper around the [iOS Tappay SDK](https://github.com/TapPay/tappay-ios-example) , [Android Tappay SDK](https://github.com/TapPay/tappay-android-example) and [Web Tappay SDK](https://github.com/TapPay/tappay-web-example), allowing for Tappay integration in React Native apps. Provided JS Code to call native functions.

This package aims to support functional usage [without Form](https://portal.tappaysdk.com/document/androidnoform). So you can custom your component/behavior or intergrate with other library as you want.

## Support [react-native for web](https://github.com/necolas/react-native-web)

Yes, this library support web usage([react-native-web](https://github.com/necolas/react-native-web)), write once and runs on iOS/Android/Web.

## PR Welcome

We use it on our production App/MWeb for 2 years. Keep update and PR welcome.

# Tappay SDK support Version
* Web: [5.6.0] <https://github.com/TapPay/tappay-web-example/releases/tag/v5.6.0>
* Android: [3.3.0] <https://github.com/TapPay/tappay-android-example/releases/tag/3.3.2>
* iOS: [2.11.1] <https://github.com/TapPay/tappay-ios-example/releases/tag/v2.11.0>

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
TapPay.cardSetup({
  fields: {
    number: {
      // css selector
      element: '#card-number',
      placeholder: '**** **** **** ****'
    },
    expirationDate: {
      // DOM object
      element: document.getElementById('card-expiration-date'),
      placeholder: 'MM / YY'
    },
    ccv: {
      element: '#card-ccv',
      placeholder: 'ccv'
    },
  },
  styles: {
    input: {
      color: 'gray',
    },
    'input.ccv': {
      'font-size': '16px',
    },
    'input.expiration-date': {
      'font-size': '16px',
    },
    'input.card-number': {
      'font-size': '16px',
    },
    ':focus': {
      color: warrior,
    },
    '.valid': {
      color: warrior,
    },
    '.invalid': {
      color: warrior,
    },
  },
});
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
TapPay.onCardUpdate(update => {
  const { cardType, canGetPrime, status } = update;

  setCardType(cardType);
  setValidated(canGetPrime);
  setHasNumberError(status.number === 2);
  setHasExpiryError(status.expiry === 2);
  setHasCCVError(status.ccv === 2);
});
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

### cardSetup [Web Only]
Parameters: `args: CardSetupArgs`<br>
Returns: `void`

[CardSetupArgs](#cardsetupargs)

### validateCard
Parameters: `cardNumber: string, dueMonth: string, dueYear: string, CCV: string`<br>
Returns: `void`

### setCard
Parameters: `cardNumber: string, dueMonth: string, dueYear: string, CCV: string`<br>
Returns: `void`

### onCardUpdate [Web Only]
Parameters: `callback: (result: UpdateResult) => void`<br>
Returns: `void`

[UpdateResult](#updateresult)

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


### CardSetupArgs
Name | Type | Content
-----|------|---------
fields.number | { element: HTMLElement or string, placeholder: string } |
fields.expirationDate | { element: HTMLElement or string, placeholder: string } |
fields.ccv | { element: HTMLElement or string, placeholder: string } | `ccv` is optional, if there is input, it will be validated, if there is no input, it will not.<br>If you don't want to display the `ccv` field, don't need to set.
styles | Object | Supported CSS - [TapPay Fields Styles](https://docs.tappaysdk.com/tutorial/zh/reference.html#tappay-fields-styles)

### UpdateResult
Name | Type | Content
-----|------|---------
cardType | string | mastercard, visa, jcb, amex, unionpay, unknown
canGetPrime | boolean |
hasError | boolean |
status.number | number | 0 = The field has been filled in and there is no problem<br>1 = The field has not been filled in yet<br>2 = Field error<br> 3 = Typing
status.expiry | number | 0 = The field has been filled in and there is no problem<br>1 = The field has not been filled in yet<br>2 = Field error<br> 3 = Typing
status.ccv | number | 0 = The field has been filled in and there is no problem<br>1 = The field has not been filled in yet<br>2 = Field error<br> 3 = Typing

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


# 📄 License

react-native-tappay is MIT licensed, as found in the [LICENSE](https://github.com/VeryBuy/react-native-tappay/blob/HEAD/LICENSE) file.
