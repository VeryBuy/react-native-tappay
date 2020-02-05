//
//  TPDCardViewManager.m
//  DirectPay
//
//  Created by xenos xavier on 2020/2/1.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <React/RCTViewManager.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_REMAP_MODULE(DirectPayTPDForm, TPDCardViewManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(errorColor, NSString)
RCT_EXPORT_VIEW_PROPERTY(okColor, NSString)
RCT_EXPORT_VIEW_PROPERTY(normalColor, NSString)
RCT_EXPORT_VIEW_PROPERTY(onUpdate, RCTDirectEventBlock)
@end
