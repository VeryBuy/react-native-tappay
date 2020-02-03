//
//  TPDCardViewManager.swift
//  DirectPay
//
//  Created by xenos xavier on 2020/2/1.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation

@objc(TPDCardViewManager)
class TPDCardViewManager: RCTViewManager {
    
    override func view() -> UIView! {
        return TPDCardView()
    }
}
