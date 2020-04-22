//
//  TPDCardInfo.h
//
//  TPDirect iOS SDK - v2.3
//  Copyright © 2017年 Cherri Tech, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface TPDCardInfo : NSObject

@property (strong, nonatomic) NSString * _Nullable bincode;
@property (strong, nonatomic) NSString * _Nullable lastFour;
@property (strong, nonatomic) NSString * _Nullable issuer;
@property (strong, nonatomic) NSString * _Nullable countryCode;
@property (strong, nonatomic) NSString * _Nullable country;
@property (strong, nonatomic) NSString * _Nullable level;

/*
 cardType
 1 = VISA
 2 = MasterCard
 3 = JCB
 4 = Union Pay
 5 = AMEX
 */
@property (assign, nonatomic) NSInteger cardType;

/*
 funding(Card usage)
 0 = credit card
 1 = debit card
 2 = prepaid card
 */
@property (assign, nonatomic) NSInteger funding;

@end
