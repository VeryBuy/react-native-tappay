//
//  TPDCart.h
//
//  TPDirect iOS SDK - v2.3
//  Copyright © 2017 Cherri Tech, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <PassKit/PassKit.h>
#import <TPDirect/TPDPaymentItem.h>

@interface TPDCart : NSObject

// Indicates the display mode for the shipping (e.g, "Pick Up", "Ship To", "Deliver To"). Localized.
// The default is PKShippingTypeShipping
@property (nonatomic, assign) PKShippingType shippingType NS_AVAILABLE_IOS(8_3);

// Shipping method chosen by the consumer. Default will be the first shipping-methods.
@property (nonatomic, strong) PKShippingMethod * shippingMethod;

// Get toatal amount
@property (nonatomic, strong, nullable) NSDecimalNumber *totalAmount;

/**
 Add New TPDPaymentItem.

 @param paymentItem TPDPaymentItem
 */
- (void)addPaymentItem:(TPDPaymentItem *)paymentItem;


/**
 Add PaymentItems.

 @param paymentItems NSArray<TPDPaymentItem *>
 */
- (void)addPaymentItems:(NSArray<TPDPaymentItem *> *)paymentItems;


/**
 Remove Payment Item.

 @param paymentItem TPDPaymentItem.
 */
- (void)removePaymentItem:(TPDPaymentItem *)paymentItem;


/**
 Update Payment Item Using Index.

 @param paymentItem TPDPaymentItem
 @param index NSInteger
 */
- (void)updateCart:(TPDPaymentItem *)paymentItem withIndex:(NSInteger)index;


/**
 Fetch All PaymentItem

 @return NSMutableArray<TPDPaymentItem *>
 */
- (NSMutableArray<TPDPaymentItem *> *)fetchAllPaymentItems;

@end
