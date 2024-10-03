export var CardType;
(function (CardType) {
    CardType[CardType["Unknown"] = -1] = "Unknown";
    CardType[CardType["VISA"] = 1] = "VISA";
    CardType[CardType["MasterCard"] = 2] = "MasterCard";
    CardType[CardType["JCB"] = 3] = "JCB";
    CardType[CardType["UnionPay"] = 4] = "UnionPay";
    CardType[CardType["AMEX"] = 5] = "AMEX";
})(CardType || (CardType = {}));
export var CardFunding;
(function (CardFunding) {
    CardFunding[CardFunding["Unknown"] = -1] = "Unknown";
    CardFunding[CardFunding["CreditCard"] = 0] = "CreditCard";
    CardFunding[CardFunding["DebitCard"] = 1] = "DebitCard";
    CardFunding[CardFunding["PrepaidCard"] = 2] = "PrepaidCard";
})(CardFunding || (CardFunding = {}));
