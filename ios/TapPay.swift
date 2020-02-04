//
//  TapPay.swift
//  DirectPay
//
//  Created by xenos xavier on 2020/2/2.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation
import AdSupport

@objc(TapPay)
class TapPay: NSObject {
    static var tpdCard: TPDCard?
    
    
    @objc
    func setup(_ appId: NSNumber, appKey: NSString, serverType: NSString) {
        let serverType: TPDServerType = (serverType == "production") ? .production : .sandBox
        TPDSetup.setWithAppId(appId.int32Value, withAppKey: appKey as String, with: serverType)
        let IDFA = ASIdentifierManager.shared().advertisingIdentifier.uuidString
        TPDSetup.shareInstance().setupIDFA(IDFA)
        TPDSetup.shareInstance().serverSync()
    }
    
    @objc
    func getDirectPayPrime(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
        if let tpdCard = TapPay.tpdCard {
            tpdCard.onSuccessCallback { (prime, cardInfo, cardIdentifier) in
                if
                    let directPayPrime = prime, directPayPrime != "",
                    let creditCardInfo = cardInfo,
                    let creditCardIdentifier = cardIdentifier
                {
                    resolve([
                        "prime": directPayPrime,
                        "binCode": creditCardInfo.bincode ?? "",
                        "lastFour": creditCardInfo.lastFour ?? "",
                        "issuer": creditCardInfo.issuer ?? "",
                        "cardType": creditCardInfo.cardType,
                        "funding": creditCardInfo.funding,
                        "cardIdentifier": creditCardIdentifier
                    ])
                }
            }.onFailureCallback { (status, message) in
                reject(String(status), message, nil)
            }.getPrime()
        }
    }
}
