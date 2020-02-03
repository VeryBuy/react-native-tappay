//
//  TPDMerchant.h
//
//  TPDirect iOS SDK - v2.3
//  Copyright © 2017 Cherri Tech, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <PassKit/PassKit.h>

@interface TPDMerchant : NSObject

// This Will Shown on payment sheet
@property (nonatomic, strong) NSString *merchantName;

// The payment processing capabilities of the merchant.
@property (nonatomic, assign) PKMerchantCapability merchantCapability;

// Self-Defined Acquirer Merchant ID As Registered On TapPay Portal
// ==> https://portal.tappaysdk.com
@property (nonatomic, strong) NSString *acquirerMerchantID;

// Apple Merchant ID, Created On The Apple Developer Website.
// Don't Forget To Add A New Apple Merchant From TapPay Portal.
// ==> https://docs.tappaysdk.com/apple-pay/en/portal.html#apple-developer-create-merchant-id
@property (nonatomic, strong) NSString *applePayMerchantIdentifier;

// The merchant's ISO country code. default Is 'TW'
@property (nonatomic, strong) NSString *countryCode;

// Currency code for this payment. default Is 'TWD'
@property (nonatomic, strong) NSString *currencyCode;

// The payment networks supported by the merchant, for example @[ PKPaymentNetworkVisa,
// PKPaymentNetworkMasterCard ].  This property constrains payment cards that may fund the payment.
@property (nonatomic, copy) NSArray<PKPaymentNetwork> *supportedNetworks;

// Shipping methods supported by the merchant.
@property (nonatomic, copy, nullable) NSArray<PKShippingMethod *> *shippingMethods;

// The payment networks and platforms supported for in-app payment
+ (NSArray<PKPaymentNetwork> *)availableNetworks NS_AVAILABLE_IOS(10_0) __WATCHOS_AVAILABLE(3.0);

@end
