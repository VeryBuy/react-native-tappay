//
//  TPDCardView.swift
//  DirectPay
//
//  Created by xenos xavier on 2020/2/1.
//  Copyright © 2020 Facebook. All rights reserved.
//

import UIKit

class TPDCardView: UIView {
    
    @objc var errorColor: NSString = "#D62D20" {
        didSet {
            tpdForm.setErrorColor(makeUIColor(withHexColorCode: errorColor as String))
        }
    }
    
    @objc var okColor: NSString = "#008744" {
        didSet {
            tpdForm.setOkColor(makeUIColor(withHexColorCode: okColor as String))
        }
    }
    
    @objc var normalColor: NSString = "#0F0F0F" {
        didSet {
            tpdForm.setNormalColor(makeUIColor(withHexColorCode: normalColor as String))
        }
    }
    
    @objc var onUpdate: RCTDirectEventBlock?
    var tpdForm: TPDForm
    
    override init(frame: CGRect) {
        let cardView: UIView = UIView(frame: CGRect.zero)
        cardView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        tpdForm = TPDForm.setup(withContainer: cardView)
//        TapPay.tpdCard = TPDCard.setup(tpdForm)
        
        super.init(frame: frame)
        tpdForm.setErrorColor(makeUIColor(withHexColorCode: errorColor as String))
        tpdForm.setOkColor(makeUIColor(withHexColorCode: okColor as String))
        tpdForm.setNormalColor(makeUIColor(withHexColorCode: normalColor as String))
        tpdForm.onFormUpdated { [weak self] status in
            if let event = self?.onUpdate {
                event(["isEnable": status.isCanGetPrime()])
            }
        }
        self.addSubview(cardView)
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func makeUIColor(withHexColorCode: String) -> UIColor {
        var hexColorCode = withHexColorCode.trimmingCharacters(in: .whitespacesAndNewlines)
        
        if (hexColorCode.hasPrefix("#")) {
            hexColorCode.remove(at: hexColorCode.startIndex)
        }
        
        if (hexColorCode.count != 6) {
            return UIColor.gray
        }
        
        var rgbValue: UInt64 = 0
        Scanner(string: hexColorCode).scanHexInt64(&rgbValue)
        
        return UIColor(
            red: CGFloat((rgbValue & 0xFF0000) >> 16) / 255.0,
            green: CGFloat((rgbValue & 0x00FF00) >> 8) / 255.0,
            blue: CGFloat(rgbValue & 0x0000FF) / 255.0,
            alpha: CGFloat(1.0)
        )
    }
    
    deinit {
//        TapPay.tpdCard = nil
    }
}
