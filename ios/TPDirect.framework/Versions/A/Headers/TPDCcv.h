//
//  TPDCcv.h
//  TPDirect
//
//  TPDirect iOS SDK - v2.11.0
//  Created by Cherri Kevin on 4/26/21.
//  Copyright © 2021 tech.cherri. All rights reserved.
//

#import <Foundation/Foundation.h>
@class TPDCcvForm;

NS_ASSUME_NONNULL_BEGIN

@interface TPDCcv : NSObject

/// Use TPDCcvForm setup TPDCcv
/// @param ccvForm (TPDCcvForm * _Nonnull)ccvForm
+ (instancetype _Nonnull)setup:(TPDCcvForm * _Nonnull)ccvForm;

/// After call get prime success will return prime in onSuccessCallback
/// @param callback (void(^ _Nonnull)(NSString *_Nonnull prime)
- (instancetype _Nonnull)onSuccessCallback:(void(^ _Nonnull)(NSString *_Nonnull prime))callback;

/// After call get prime fail will return error status, message in onFailureCallback
/// @param callback (void(^ _Nonnull)(NSInteger status, NSString *_Nonnull message))
- (instancetype _Nonnull)onFailureCallback:(void(^ _Nonnull)(NSInteger status,
                                                             NSString *_Nonnull message))callback;

/// Get CCV Prime
- (void)getPrime;


@end

NS_ASSUME_NONNULL_END
