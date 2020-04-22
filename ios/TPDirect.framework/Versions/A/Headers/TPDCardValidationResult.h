//
//  TPDCardValidationResult.h
//  TPDirect
//
//  TPDirect iOS SDK - v2.3
//  Copyright © 2017年 tech.cherri. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "TPDCard.h"

@interface TPDCardValidationResult : NSObject

/**
 Get Card Number Is Valid.
 */
@property (assign, nonatomic) BOOL isCardNumberValid;
/**
 Get Expiry Date Is Valid.
 */
@property (assign, nonatomic) BOOL isExpiryDateValid;
/**
 Get CCV is Valid.
 */
@property (assign, nonatomic) BOOL isCCVValid;
/**
 Get Card Type.
 */
@property (assign, nonatomic) CardType cardType;

/**
 @return TPDCardValidationResult Instance.
 */
+ (instancetype _Nonnull)result;

@end
