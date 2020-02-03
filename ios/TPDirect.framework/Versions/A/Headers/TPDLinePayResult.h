//
//  TPDLinePayResult.h
//  TPDirect
//
//  TPDirect iOS SDK - v2.3
//  Copyright © 2017年 tech.cherri. All rights reserved.
//


@interface TPDLinePayResult : NSObject


/**
 Get linePayResult recTradeId
 */
@property (strong ,nonatomic) NSString * recTradeId;
/**
 Get linePayResult orderNumber
 */
@property (strong ,nonatomic) NSString * orderNumber;
/**
 Get linePayResult status
 */
@property (assign ,nonatomic) NSInteger status;
/**
 Get linePayResult bankTransactionId
 */
@property (strong ,nonatomic) NSString * bankTransactionId;


@end
