//
//  TapPay.swift
//  DirectPay
//
//  Created by xenos xavier on 2020/2/2.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation
import AdSupport
import TPDirect

@objc(TapPay)
class TapPay: NSObject {
    private let cardTypes = [
        CardType.visa: 1,
        CardType.masterCard: 2,
        CardType.JCB: 3,
        CardType.unionPay: 4,
        CardType.AMEX: 5,
        CardType.unknown: -1,
    ]
    
    private var tpdCard: TPDCard?
    private var tpdLinePay: TPDLinePay?
    private var tpdApplePay: TPDApplePay?
    var applePayResolver: RCTPromiseResolveBlock! = nil
    var applePayRejector: RCTPromiseRejectBlock! = nil
    var applePay : TPDApplePay!
    
    
    @objc
    func setup(_ appId: NSNumber, appKey: NSString, serverType: NSString) {
        let serverType: TPDServerType = (serverType == "production") ? .production : .sandBox
        TPDSetup.setWithAppId(appId.int32Value, withAppKey: appKey as String, with: serverType)
    }

    @objc
    func setupWithRBA(_ appId: NSNumber, appKey: NSString, rbaId: NSString, rbaKey: NSString, serverType: NSString) {
        // https://github.com/TapPay/tappay-ios-example/releases/tag/v2.16.5
        print("setupWithRBA has been removed since v2.16.5");
    }
    
    @objc
    func validateCard(
        _ cardNumber: String,
        withDueMonth dueMonth: String,
        withDueYear dueYear: String,
        withCCV ccv: String,
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        let response = TPDCard.validate(withCardNumber: cardNumber, withDueMonth: dueMonth, withDueYear: dueYear, withCCV: ccv)
        
        if let result = response {
            resolve([
                "isCardNumberValid": result.isCardNumberValid,
                "isExpiredDateValid": result.isExpiryDateValid,
                "isCCVValid": result.isCCVValid,
                "cardType": self.cardTypes[result.cardType] ?? self.cardTypes[CardType.unknown]!
            ])
        } else {
            reject("Error Code", "No Response", nil)
        }
    }
    
    @objc
    func getDirectPayPrime(
        _ cardNumber: String,
        withDueMonth dueMonth: String,
        withDueYear dueYear: String,
        withCCV ccv: String,
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        let tpdCard = TPDCard.setWithCardNumber(cardNumber, withDueMonth: dueMonth, withDueYear: dueYear, withCCV: ccv)
        
        tpdCard.onSuccessCallback { (prime, cardInfo, cardIdentifier, merchantReferenceInfo) in
            if
                let directPayPrime = prime, directPayPrime != "",
                let creditCardInfo = cardInfo,
                let creditCardIdentifier = cardIdentifier
            {
                resolve([
                    "prime": directPayPrime,
                    "bincode": creditCardInfo.bincode ?? "",
                    "lastfour": creditCardInfo.lastFour ?? "",
                    "issuer": creditCardInfo.issuer ?? "",
                    "type": creditCardInfo.cardType,
                    "funding": creditCardInfo.funding,
                    "cardidentifier": creditCardIdentifier,
                    "merchantReferenceInfo": merchantReferenceInfo
                ])
            }
        }.onFailureCallback { (status, message) in
            reject(String(status), message, nil)
        }.createToken(withGeoLocation: "UNKNOWN")
    }
    
    @objc
    func getLinePayPrime(
        _ returnUrl: String,
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        let tpdLinePay = TPDLinePay.setup(withReturnUrl: returnUrl)
        if (TPDLinePay.isLinePayAvailable()){
            tpdLinePay.onSuccessCallback{(prime) in resolve([ "prime": prime ])}.onFailureCallback{
                (status, message) in reject(String(status), message, nil)
            }.getPrime()
        } else {
            reject(String("Fail"), String("Line Pay is not exist."), nil)
        }
    }
    
    @objc
    func isLinePayAvailable(_ promise: RCTPromiseResolveBlock, rejector reject: RCTPromiseRejectBlock) {

        promise(TPDLinePay.isLinePayAvailable())
    }
    
    @objc
    func handleLinePayURL(
        _ url: String,
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        if let redirectURL = URL(string: url), TPDLinePay.handle(redirectURL) {
            resolve(true)
        } else {
            reject("Fail", "LINE Pay transaction fail.", nil)
        }
    }
    
    @objc
    func setCard(
        _ cardNumber: String,
        withDueMonth dueMonth: String,
        withDueYear dueYear: String,
        withCCV ccv: String
    ) {
        self.tpdCard = TPDCard.setWithCardNumber(cardNumber, withDueMonth: dueMonth, withDueYear: dueYear, withCCV: ccv)
    }
    
    @objc
    func removeCard() {
        self.tpdCard = nil
    }
    
    @objc
    func getDirectPayPrime(
        _ resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        
        if let tpdCard = self.tpdCard {
            tpdCard.onSuccessCallback { (prime, cardInfo, cardIdentifier, merchantReferenceInfo) in
                if
                    let directPayPrime = prime, directPayPrime != "",
                    let creditCardInfo = cardInfo,
                    let creditCardIdentifier = cardIdentifier
                {
                    resolve([
                        "prime": directPayPrime,
                        "bincode": creditCardInfo.bincode ?? "",
                        "lastfour": creditCardInfo.lastFour ?? "",
                        "issuer": creditCardInfo.issuer ?? "",
                        "type": creditCardInfo.cardType,
                        "funding": creditCardInfo.funding,
                        "cardidentifier": creditCardIdentifier,
                        "merchantReferenceInfo": merchantReferenceInfo
                    ])
                }
            }.onFailureCallback { (status, message) in
                reject(String(status), message, nil)
            }.createToken(withGeoLocation: "UNKNOWN")
        }
    }
    
    @available(iOS 9.0, *)
    @objc
    func merchantSetting(merchantData: NSDictionary) -> TPDMerchant {
        
        let merchantName = merchantData["merchantName"] as! String
        let merchantIdentifier = merchantData["merchantIdentifier"] as! String
        let countryCode = merchantData["countryCode"] as! String
        let currencyCode = merchantData["currencyCode"] as! String
        
        var merchant : TPDMerchant!

        merchant = TPDMerchant()
        merchant.merchantName               = merchantName
        merchant.merchantCapability         = .capability3DS;
        merchant.applePayMerchantIdentifier = merchantIdentifier
        merchant.countryCode                = countryCode;
        merchant.currencyCode               = currencyCode;
        if #available(iOS 10.1, *) {
            merchant.supportedNetworks          = [.amex, .masterCard, .visa, .JCB]
        } else {
            merchant.supportedNetworks          = [.amex, .masterCard, .visa]
        }
    
        return merchant
    }
    
    @available(iOS 9.0, *)
    @objc
    func consumerSetting() -> TPDConsumer {
        
        var consumer : TPDConsumer!
        // Set Consumer Contact.
        let contact = PKContact()
        
        let nameComponent    = PersonNameComponents()
        contact.name    = nameComponent;
        
        consumer = TPDConsumer()
        consumer.billingContact     = contact
        consumer.shippingContact    = contact
        //consumer.requiredShippingAddressFields  = []
        //consumer.requiredBillingAddressFields = []
        

    
        return consumer
    }
    
    @available(iOS 9.0, *)
    @objc
    func cartSetting(cartData: [NSDictionary]) -> TPDCart {
        
        var cart     : TPDCart!
            cart = TPDCart()
            
        cartData.forEach({ (item) in
            let itemName = item["itemName"] as! String
            let price = item["price"] as! Double
            
            let tpdItem = TPDPaymentItem(itemName: itemName,
                                         withAmount: NSDecimalNumber(value: price),
                                         withIsVisible: true)
            cart.add(tpdItem)
        })
        return cart
    }
    
    @objc
    func isApplePayAvailable(_ promise: RCTPromiseResolveBlock, rejector reject: RCTPromiseRejectBlock) {
        
        promise(TPDApplePay.canMakePayments())
    }
  
    @available(iOS 9.0, *)
    @objc
    func getApplePayPrime(
        _ merchantData: NSDictionary,
        cartData: [NSDictionary],
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        print("getApplePayPrime");
       
        let merchant = merchantSetting(merchantData: merchantData)
        let consumer = consumerSetting()
        let cart     = cartSetting(cartData: cartData)

        applePay = TPDApplePay.setupWthMerchant(merchant, with: consumer, with: cart, withDelegate: self)
//
        self.applePayResolver = resolve;
        self.applePayRejector = reject;
        applePay.startPayment()
    }
}

extension TapPay : TPDApplePayDelegate {
    func tpdApplePayDidStartPayment(_ applePay: TPDApplePay!) {
        print("=====================================================")
        print("Apple Pay On Start")
        print("===================================================== \n\n")
    }
    
    func tpdApplePay(_ applePay: TPDApplePay!, didSuccessPayment result: TPDTransactionResult!) {
        print("=====================================================")
        print("Apple Pay Did Success ==> Amount : \(result.amount.stringValue)")
        print("===================================================== \n\n")
    }
        
    func tpdApplePay(_ applePay: TPDApplePay!, didFailurePayment result: TPDTransactionResult!) {
        print("=====================================================")
        print("Apple Pay Did Failure ==> Message : \(result.message), ErrorCode : \(result.status)")
        print("===================================================== \n\n")
        if ((self.applePayRejector) != nil) {
            self.applePayRejector(result.message, String(result.status), nil);
        }
    }
    
    func tpdApplePayDidCancelPayment(_ applePay: TPDApplePay!) {
        print("=====================================================")
        print("Apple Pay Did Cancel")
        print("===================================================== \n\n")
        if ((self.applePayRejector) != nil) {
            self.applePayRejector("User canceled", "-1", nil);
        }
    }
    
    func tpdApplePayDidFinishPayment(_ applePay: TPDApplePay!) {
        print("=====================================================")
        print("Apple Pay Did Finish")
        print("===================================================== \n\n")
        if ((self.applePayResolver) != nil) {
            self.applePayResolver = nil;
        }
        if ((self.applePayRejector) != nil) {
            self.applePayRejector = nil;
        }
    }
    
    // With Payment Handle
    func tpdApplePay(_ applePay: TPDApplePay!, didReceivePrime prime: String!, withExpiryMillis expiryMillis: Int, with cardInfo: TPDCardInfo, withMerchantReferenceInfo merchantReferenceInfo: [AnyHashable : Any]!) {
        // 1. Send Your Prime To Your Server, And Handle Payment With Result
        // ...
        print("=====================================================");
        print("======> didReceivePrime");
        print("Prime : \(prime!)");
        print("Expiry millis : \(expiryMillis)");
        print("total Amount :   \(applePay.cart.totalAmount!)")
        print("Client IP : \(applePay.consumer.clientIP!)")
        print("merchantReferenceInfo : \(merchantReferenceInfo["affiliateCodes"]!)")
        print("shippingContact.name : \(applePay.consumer.shippingContact?.name?.givenName) \(applePay.consumer.shippingContact?.name?.familyName)");
        print("shippingContact.emailAddress : \(applePay.consumer.shippingContact?.emailAddress)");
        print("shippingContact.phoneNumber : \(applePay.consumer.shippingContact?.phoneNumber?.stringValue)");

        // 2. If Payment Success, set paymentReault = ture.
        let paymentReault = true;
        applePay.showPaymentResult(paymentReault)
        if ((self.applePayResolver) != nil) {
            self.applePayResolver([ "prime": prime ])
        }
    }
}

