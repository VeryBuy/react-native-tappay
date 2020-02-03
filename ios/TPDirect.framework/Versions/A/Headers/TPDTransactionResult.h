//
//  TPDTransactionResult.h
//
//  TPDirect iOS SDK - v2.3
//  Copyright © 2017 Cherri Tech, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <PassKit/PassKit.h>

@interface TPDTransactionResult : NSObject

// message, Report Message.
@property (nonatomic, strong) NSString *message;

// status, Result Code, '0' Means Success.
@property (nonatomic, assign) NSInteger status;

// amount
@property (nonatomic, strong) NSDecimalNumber *amount;

// paymentMehod
@property (nonatomic, strong) PKPaymentMethod *paymentMethod;

@end
