//
//  TapPay.m
//  DirectPay
//
//  Created by xenos xavier on 2020/2/2.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(TapPay, NSObject)
RCT_EXTERN_METHOD(setup: (nonnull NSNumber*)appId
                  appKey: (NSString*)appkey
                  serverType: (NSString*)serverType)
RCT_EXTERN_METHOD(getDirectPayPrime: (RCTPromiseResolveBlock)resolve 
                  rejecter: (RCTPromiseRejectBlock)reject)
@end
