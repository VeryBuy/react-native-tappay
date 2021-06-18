//
//  TPDEasyWallet.h
//  TPDirect
//
//  TPDirect iOS SDK - v2.11.0
//  Created by Cherri Kevin on 11/6/20.
//  Copyright © 2020 tech.cherri. All rights reserved.
//

#import "TPDEasyWalletResult.h"

@interface TPDEasyWallet : NSObject

/// Set on getPrime Success Callback
///
/// @param callback (NSString *_Nullable prime)
- (instancetype _Nonnull)onSuccessCallback:(void(^_Nonnull)(NSString *_Nullable prime))callback;

/// Set on getPrime Failure Callback
///
/// @param callback (NSInteger status, NSString *_Nonnull message)
- (instancetype _Nonnull)onFailureCallback:(void(^_Nonnull)(NSInteger status , NSString *_Nonnull message))callback;

/// Setup TPDEasyWallet Instance
///
/// @param returnUrl NSString, returnUrl
+ (instancetype _Nonnull)setupWithReturUrl: (NSString * _Nonnull)returnUrl;

/// This Method Will Get Prime, And Return Results Via onSuccessCallback and onFailureCallback.
- (void)getPrime;

/// Pass Payment Url to redirect to EasyWallet App, complete Easy Wallet transaction Get Result via callback.
/// @param url Payment Url From Pay By Prime Success.
/// @param callback Get Easy Wallet Result, You Need to implement handleUrl in AppDelegate continueUserActivity
- (void)redirect:(NSString * _Nonnull)url completion:(void (^_Nonnull)(TPDEasyWalletResult * _Nonnull result))callback;

/// Use this method to handle link come from TapPay,
/// and return results via redirectWith Url (TPDEasyWalletResult callback).
/// @param link From TapPay Payment Result Url
+ (BOOL)handleEasyWalletUniversalLink: (NSURL * _Nonnull)link;

/// Check device installed Easy Wallet App.
+ (BOOL)isEasyWalletAvailable;

/// Go to App Store install Easy Wallet App.
+ (void)installEasyWalletApp;

/// Set up Exception Observer
/// @param aSelector handle exception function.
+ (void)addExceptionObserver:(SEL)aSelector;

/// Use this function in your handle exception function to parse Easy Wallet result
/// @param notification , Handle exception
+ (TPDEasyWalletResult *)parseURL:(NSNotification *)notification;

@end
