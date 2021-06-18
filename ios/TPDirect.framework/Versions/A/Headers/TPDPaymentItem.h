//
//  TPDPaymentItem.h
//
//  TPDirect iOS SDK - v2.11.0
//  Copyright © 2017 Cherri Tech, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <PassKit/PassKit.h>

@interface TPDPaymentItem : NSObject

@property (nonatomic, copy) NSString *itemName;
@property (nonatomic, copy) NSDecimalNumber *amount;
@property (nonatomic, assign) BOOL isVisible;
@property (nonatomic, assign) PKPaymentSummaryItemType type;


/**
 Initialize PaymentItem

 @param itemName NSString, PaymentItem Name, Shown In The Apple Pay Form.
 @param amount NSDecimalNumber, Amount, , Shown In The Apple Pay Form As '10.00'.
 @return instancetype
 */
+ (instancetype)paymentItemWithItemName:(NSString *)itemName withAmount:(NSDecimalNumber *)amount;


/**
 Initialize PaymentItem
 
 @param itemName NSString, PaymentItem Name, Shown In The Apple Pay Form.
 @param amount NSDecimalNumber, Amount, , Shown In The Apple Pay Form As '10.00'.
 @param isVisible BOOL, if NO, item would not be shown on payment sheet.
 @return instancetype
 */
+ (instancetype)paymentItemWithItemName:(NSString *)itemName withAmount:(NSDecimalNumber *)amount withIsVisible:(BOOL)isVisible;


+ (instancetype)pendingPaymentItemWithItemName:(NSString *)itemName;

@end

