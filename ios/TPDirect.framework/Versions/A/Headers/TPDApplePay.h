//
//  TPDApplePay.h
//
//  TPDirect iOS SDK - v2.3
//  Copyright © 2017年 Cherri Tech, Inc. All rights reserved.
//  See the Apple Pay Document
//  ==> https://docs.tappaysdk.com/apple-pay

#import <Foundation/Foundation.h>
#import <PassKit/PassKit.h>
#import <TPDirect/TPDMerchant.h>
#import <TPDirect/TPDConsumer.h>
#import <TPDirect/TPDCart.h>
#import <TPDirect/TPDTransactionResult.h>

@class TPDApplePay;
@class TPDTransactionResult;
@class TPDCart;

@protocol TPDApplePayDelegate <NSObject>

@required

// Send To The Delegate After Receive PaymentToken.
// Remember To Send Prime To Your Server, And Use PayByPrime API
// 'https://docs.tappaysdk.com/apple-pay/zh/back.html#pay-by-prime-api' To Finish Payment.
- (void)tpdApplePay:(TPDApplePay *)applePay didReceivePrime:(NSString *)prime;

// Send To The Delegate After Apple Pay Payment Processing Succeeds.
- (void)tpdApplePay:(TPDApplePay *)applePay didSuccessPayment:(TPDTransactionResult *)result;

// Send To The Delegate After Apple Pay Payment Processing Fails.
- (void)tpdApplePay:(TPDApplePay *)applePay didFailurePayment:(TPDTransactionResult *)result;


@optional
// Send To The Delegate After Apple Pay Payment's Form Is Shown.
- (void)tpdApplePayDidStartPayment:(TPDApplePay *)applePay;

// Send To The Delegate After User Selects A Payment Method.
// You Can Change The PaymentItem Or Discount Here.
- (TPDCart *)tpdApplePay:(TPDApplePay *)applePay didSelectPaymentMethod:(PKPaymentMethod *)paymentMethod cart:(TPDCart *)cart;

// Send To The Delegate After User Selects A Shipping Method.
// Set shippingMethods ==> TPDMerchant.shippingMethods.
- (void)tpdApplePay:(TPDApplePay *)applePay didSelectShippingMethod:(PKShippingMethod *)shippingMethod;

// Send To The Delegate After User Authorizes The Payment.
// You Can Check Shipping Contact Here, Return YES If Authorized.
- (BOOL)tpdApplePay:(TPDApplePay *)applePay canAuthorizePaymentWithShippingContact:(PKContact *)shippingContact;

// Send To The Delegate After User Cancels The Payment.
- (void)tpdApplePayDidCancelPayment:(TPDApplePay *)applePay;

// Send To The Delegate After Apple Pay Payment's Form Dissappeared.
- (void)tpdApplePayDidFinishPayment:(TPDApplePay *)applePay;

@end

@interface TPDApplePay : NSObject

@property (nonatomic, strong) TPDMerchant   *merchant;
@property (nonatomic, strong) TPDConsumer   *consumer;
@property (nonatomic, strong) TPDCart       *cart;
@property (nonatomic, strong) id<TPDApplePayDelegate> delegate;

/**
 This Method Will Return A TPDApplePay Instance.

 @param merchant TPDMerchant.
 @param consumer TPDConsumer.
 @param cart TPDCart.
 @param delegate <id>
 @return instancetype
 */
+ (instancetype)setupWthMerchant:(TPDMerchant *)merchant withConsumer:(TPDConsumer *)consumer withCart:(TPDCart *)cart withDelegate:(id)delegate;


/**
 This Method Will Direct To The Wallet To Set Up Credit Card.
 */
+ (void)showSetupView;

/**
 Check If The Device Can Support Apple Pay.

 @return BOOL, result
 */
+ (BOOL)canMakePayments;

/**
 Check If The User Has Set Up His Or Her Card And Can Use Apple Pay.

 @param paymentNetworks paymentNetworks, @[PKPaymentNetworkVisa, PKPaymentNetworkMasterCard]
 @return BOOL, result
 */
+ (BOOL)canMakePaymentsUsingNetworks:(NSArray<PKPaymentNetwork> *)paymentNetworks;


/**
 This Method Will Show Apple Pay Form.
 // ** Call This Method After TPDApplePay Is Initialized.
 */
- (void)startPayment;


/**
 This Method Will Let Apple Pay Success / Failure
 Handle Result In Delegate. '- (BOOL)tpdApplePay:(TPDApplePay *)applePay didReceivePaymentToken:(NSDictionary *)paymentToken'
 */
- (void)showPaymentResult:(BOOL)result;


@end
