//
//  TPDCcvForm.h
//  TPDirect
//
//  TPDirect iOS SDK - v2.11.0
//  Created by Cherri Kevin on 4/23/21.
//  Copyright © 2021 tech.cherri. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "TPDCard.h"

@class TPDStatus;

@class TPDStatus;

@interface TPDCcvForm : UIView

/// Use UIView setup TPDCcvForm
/// @param view UIView
+ (instancetype)setupCCVWithContainer:(UIView *)view;

/// Get is CCV Form can get ccv prime
/// @param callback TPDStatus
- (instancetype _Nonnull)onCCVFormUpdated:(void (^ _Nonnull)(TPDStatus * _Nullable status))callback;

/// Setup card type to verify ccv format
/// @param cardType Enum CardType
- (void)setCCVFormCardType:(CardType) cardType;

/// Show off Keyboard
- (void)showOffKeyboard;

/// Set Error Status TextField TextColor
/// @param color Error Color
- (void)setErrorColor:(UIColor * _Nonnull)color;

/// Set Ok Status TextField TextColor
/// @param color Ok Color
- (void)setOkColor:(UIColor * _Nonnull)color;

/// Set Normal Status TextField TextColor
/// @param color NormalColor
- (void)setNormalColor:(UIColor * _Nonnull)color;

/// return NSString CCV from TPDCcvForm
- (NSString *)getCCV;

@end


