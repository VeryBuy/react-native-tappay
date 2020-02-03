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
    func getDirectPayPrime(_ onSuccess: @escaping RCTResponseSenderBlock, onFailure: @escaping RCTResponseSenderBlock) {
        if let tpdCard = TapPay.tpdCard {
            tpdCard.onSuccessCallback { (prime, cardInfo, cardIdentifier) in
                onSuccess([
                    prime!
                ])
            }.onFailureCallback { (status, message) in
                onFailure([
                    status,
                    message
                ])
            }.getPrime()
        }
    }
}
