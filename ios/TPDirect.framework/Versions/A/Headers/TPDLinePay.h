//
//  TPDLinePay.h
//  TPDirect
//
//  TPDirect iOS SDK - v2.3
//  Copyright © 2017年 tech.cherri. All rights reserved.
//

#import "TPDLinePayResult.h"

@interface TPDLinePay : NSObject



/**
 Set on getPrime Success Callback

 @param callback (NSString *_Nullable prime)
 @return Instance
 */
- (instancetype _Nonnull)onSuccessCallback:(void(^_Nonnull)(NSString *_Nullable prime))callback;

/**
 Set on getPrime Failure Callback

 @param callback (NSInteger status, NSString *_Nonnull message)
 @return Instance
 */
- (instancetype _Nonnull)onFailureCallback:(void(^_Nonnull)(NSInteger status , NSString *_Nonnull message))callback;

/**
 This Method Will Get Prime , And Return Results Via onSuccessCallback and onFailureCallback.
 */
- (void)getPrime;

/**
 Setup TPDLinePay Instance.

 @param returnUrl NSString , returnUrl.
 @return TPDLinePay Instance.
 */
+ (instancetype _Nonnull)setupWithReturnUrl:(NSString *_Nonnull)returnUrl;

/**
 Go to App Store install Line App.
 */
+ (void)installLineApp;

/**
 Check Device can use Line Pay.

 @return BOOL
 */
+ (BOOL)isLinePayAvailable;

/**
 Pass Payment Url to redirect to LINE Pay , complete LINE Pay Transaction Get Result via callback.

 @param url Payment Url Get From Pay By Prime Success.
 @param viewController show line pay payment ViewController
 @param callback Get Line Pay Result , You Need to implement handleUrl in AppDelegate openURL.
 */
- (void)redirect:(NSString *_Nonnull)url withViewController:(UIViewController *_Nonnull)viewController completion:(void (^_Nonnull)(TPDLinePayResult * _Nonnull result))callback;

/**
 Use this method to handle url come from TapPay ,
 and return results via redirectWith Url (TPDLinePayResult callback).
 
 @param url , From TapPay Payment Result Url.
 @return BOOL , Check URL is from TapPay.
 */
+ (BOOL)handleURL:(NSURL *_Nonnull)url;

/**
 Set up Exception Observer.

 @param aSelector handle exception function.
 */
+ (void)addExceptionObserver:(SEL _Nonnull)aSelector;

/**
 Use this function in your handle exception function to parse LINE Pay result.

 @param notification , Handle exception.
 @return TPDLinePayResult
 */
+ (TPDLinePayResult *_Nonnull)parseURL:(NSNotification *_Nonnull)notification;

@end
