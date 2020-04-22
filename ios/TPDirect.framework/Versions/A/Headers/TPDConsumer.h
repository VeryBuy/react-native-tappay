//
//  TPDConsumer.h
//
//  TPDirect iOS SDK - v2.3
//  Copyright © 2017 Cherri Tech, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <PassKit/PassKit.h>


@interface TPDConsumer : NSObject

// If the merchant already has a billing address on file, set it here.
@property (nonatomic, strong, nullable) PKContact *billingContact;

// If the merchant already has a shipping address on file, set it here.
@property (nonatomic, strong, nullable) PKContact *shippingContact;

// Indicates which billing address fields the merchant requires in order to process a transaction.
// The default is PKAddressFieldNone.
@property (nonatomic, assign) PKAddressField requiredBillingAddressFields;

// Indicates which shipping address fields the merchant requires in order to process a transaction.
// The default is PKAddressFieldNone.
@property (nonatomic, assign) PKAddressField requiredShippingAddressFields;

// Get client IP
@property (nonatomic ,strong, nullable) NSString *clientIP;


@end
