//
//  TPDEasyWalletResult.h
//  TPDirect
//
//  TPDirect iOS SDK - v2.11.0
//  Created by Cherri Kevin on 11/6/20.
//  Copyright © 2020 tech.cherri. All rights reserved.
//

#import <Foundation/Foundation.h>
@interface TPDEasyWalletResult: NSObject

@property (strong, nonatomic) NSString * recTradeId;
@property (strong, nonatomic) NSString * orderNumber;
@property (assign, nonatomic) NSInteger  status;
@property (strong, nonatomic) NSString * bankTransactionId;

@end
