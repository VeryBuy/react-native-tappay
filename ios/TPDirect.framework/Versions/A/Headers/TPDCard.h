//
//  TPDCard.h
//
//  TPDirect iOS SDK - v2.3
//  Copyright © 2016年 Cherri Tech, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
@class TPDCardInfo;
@class TPDCardValidationResult;
@class TPDForm;


typedef NS_ENUM(NSInteger, CardType) {
    CardType_Visa,
    CardType_JCB,
    CardType_MasterCard,
    CardType_AMEX,
    CardType_UnionPay,
    CardType_Unknown

};

@interface TPDCard : NSObject


#pragma mark - Initialize
/**
 This Class Method Will Set Up And Return TPDCard Instance For The Next Operation

 @param cardNumber NSString, 16-digits, i.e. @"4477000011112222"
 @param dueMonth NSString, MM, i.e. December -> @"12"
 @param dueYear NSString, YY, i.e. 2022 -> @"22"
 @param CCV NSString, Required, i.e. @"345"
 @return TPDCard Instance
 */
+ (instancetype _Nonnull)setWithCardNumber:(NSString * _Nonnull)cardNumber
                              withDueMonth:(NSString * _Nonnull)dueMonth
                               withDueYear:(NSString * _Nonnull)dueYear
                                   withCCV:(NSString * _Nonnull)CCV;



/**
 This Class Method Will Set Up TPDCard With TPDForm and Return TPDCard Instance

 @param tpdForm (TPDForm * _Nonnull)tpdForm
 @return TPDCard Instance
 */
+ (instancetype _Nonnull)setup:(TPDForm * _Nonnull)tpdForm;

#pragma mark - Function
/**
 Set On CreateToken Success Callback
 Remember To Send 'prime' Back To Your Server.

 @param callback (NSString *_Nullable prime, TPDCardInfo *_Nullable cardInfo)
 @return TPDCard Instance
 */
- (instancetype _Nonnull)onSuccessCallback:(void(^ _Nonnull)(NSString *_Nullable prime, TPDCardInfo *_Nullable cardInfo, NSString * _Nullable cardIdentifier))callback;


/**
 Set On CreateToken Failure Callback

 @param callback (NSInteger status, NSString *_Nonnull message)
 @return TPDCard Instance
 */
- (instancetype _Nonnull)onFailureCallback:(void(^ _Nonnull)(NSInteger status,
                                                             NSString *_Nonnull message))callback;


/**
 This Method Will Synchronize With The Server, And Return Results Through onSuccessCallback and onFailureCallback.

 @param geoLocation NSString, (Lat, Lon) i.e. "(22.345,122.567)" or "UNKNOWN" if not known.
 */
- (void)createTokenWithGeoLocation:(NSString * _Nonnull)geoLocation;


/**
 
 This Method Will Get Prime , And Return Results Via onSuccessCallback and onFailureCallback.
 
 */
- (void)getPrime;


/**
 This Class Method Will Valid Card And Return TPDCardValidationResult Instance.

 @param cardNumber NSString, 16-digits, i.e. @"4477000011112222"
 @param dueMonth NSString, MM, i.e. December -> @"12"
 @param dueYear NSString, YY, i.e. 2022 -> @"22"
 @param CCV NSString, Required, i.e. @"345"
 @return TPDCardValidationResult Instance
 */
+ (TPDCardValidationResult *)validateWithCardNumber:(NSString * _Nonnull)cardNumber withDueMonth:(NSString * _Nonnull)dueMonth withDueYear:(NSString * _Nonnull)dueYear withCCV:(NSString * _Nonnull)CCV;

@end
