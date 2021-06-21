//
//  TPDJKOPay.h
//  TPDirect
//
//  TPDirect iOS SDK - v2.11.0
//  Created by Cherri Kevin on 3/30/20.
//  Copyright © 2020 tech.cherri. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "TPDJKOPayResult.h"

NS_ASSUME_NONNULL_BEGIN

@interface TPDJKOPay : NSObject



/// Set on getPrime Success Callback
///
/// @param callback (NSString * _Nullable prime)
/// @return Instance
- (instancetype _Nonnull)onSuccessCallback:(void(^_Nonnull)(NSString *_Nullable prime))callback;

/// Set on getPrime Failure Callback
///
/// @param callback (NSInteger status, NSString *_Nonnull message)
/// @return Instance
- (instancetype _Nonnull)onFailureCallback:(void(^_Nonnull)(NSInteger status , NSString *_Nonnull message))callback;

/// Setup TPDJKOPay Instance
/// @param returnUrl NSString, returnUrl
/// @return TPDJKOPay Instance
+ (instancetype _Nonnull)setupWithReturnUrl:(NSString *_Nonnull)returnUrl;

/// This Method Will Get Prime, And Return Results Via onSuccessCallback and onFailureCallback.
- (void)getPrime;

/// Pass Payment Url to redirect to JKOPAY App, complete JKOPAY Transaction Get Result via Callback
///
/// @param url Payment Url Get From Pay By Prime Success.
/// @param callback Get JKO Pay Result, You Need to implement handleUrl in AppDelegate continueUserActivity
- (void)redirect:(NSString *_Nonnull)url completion:(void (^_Nonnull)(TPDJKOPayResult * _Nonnull result))callback;

/// Check device installed JKO App
+ (BOOL)isJKOPayAvailable;

/// Go to App Store install JKO App
+ (void)installJKOApp;

/// Use this method to handle link come from TapPay ,
/// and return results via redirectWith Url (TPDJKOPayResult callback).
///
/// @param link , From TapPay Payment Result Url
/// @return BOOL, Check link is from TapPay.
+ (BOOL)handleJKOUniversalLink:(NSURL * _Nonnull)link;

/// Set up Exception Observer
/// @param aSelector handle exception function.
+ (void)addExceptionObserver:(SEL)aSelector;

/// Use this function in your handle exception function to parse JKOPAY result
/// @param notification , Handle exception
/// @return TPDJKOPayResult
+ (TPDJKOPayResult *)parseURL:(NSNotification *)notification;
@end

NS_ASSUME_NONNULL_END
