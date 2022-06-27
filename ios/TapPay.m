//
//  TapPay.m
//  DirectPay
//
//  Created by xenos xavier on 2020/2/2.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <React/RCTBridgeModule.h>
#import "DirectPay-Bridging-Header.h"

@interface RCT_EXTERN_MODULE(TapPay, NSObject)
RCT_EXTERN_METHOD(setup: (nonnull NSNumber*)appId
                  appKey: (NSString*)appkey
                  serverType: (NSString*)serverType)

RCT_EXTERN_METHOD(setupWithRBA: (nonnull NSNumber*)appId
                  appKey: (NSString*)appkey
                  rbaId: (NSString*)rbaId
                  rbaKey: (NSString*)rbaKey
                  serverType: (NSString*)serverType)

RCT_EXTERN_METHOD(validateCard: (NSString*)cardNumber
                  withDueMonth: (NSString*)dueMonth
                  withDueYear: (NSString*)dueYear
                  withCCV: (NSString*)ccv
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)

_RCT_EXTERN_REMAP_METHOD(getDirectPayPrimeWithCardData,
                         getDirectPayPrime: (NSString*)cardNumber
                         withDueMonth: (NSString*)dueMonth
                         withDueYear: (NSString*)dueYear
                         withCCV: (NSString*)ccv
                         resolver: (RCTPromiseResolveBlock)resolve
                         rejecter: (RCTPromiseRejectBlock)reject,
                         NO)
RCT_EXTERN_METHOD(getLinePayPrime: (NSString*)returnUrl
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(isLinePayAvailable:(RCTPromiseResolveBlock)promise rejector: (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(handleLinePayURL: (NSString*)url
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setCard: (NSString*)cardNumber
                  withDueMonth: (NSString*)dueMonth
                  withDueYear: (NSString*)dueYear
                  withCCV: (NSString*)ccv)

RCT_EXTERN_METHOD(removeCard)

RCT_EXTERN_METHOD(getDirectPayPrime: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(isApplePayAvailable:(RCTPromiseResolveBlock)promise rejector: (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getApplePayPrime: (NSDictionary)merchantData
                  shippingData: (NSDictionary)shippingData
                  cartData: (NSDictionaryArray)cartData
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)

@end
