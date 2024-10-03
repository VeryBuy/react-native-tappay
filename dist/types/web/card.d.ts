import { CardBasicInfo } from '../card';
import { GetPrime } from '../common';
interface Field {
    element: HTMLElement | string;
    placeholder: string;
}
export interface CardSetupArgs {
    fields: {
        number: Field;
        expirationDate: Field;
        ccv?: Field;
    };
    styles: unknown;
}
export interface Card extends CardBasicInfo {
    /** 發卡銀行中文名稱 */
    issuer_zh_tw: string;
    /** 發卡銀行代碼 */
    bank_id: string;
    /** 卡片等級 */
    level: string;
    /** 發卡行國家 */
    country: string;
    /** 發卡行國家碼 */
    countrycode: string;
}
export interface MerchantReferenceInfo {
    /** 商戶在 TapPay 後台的 Co-brand card management 功能專區設定的Affiliated codes */
    affiliate_codes: unknown[];
}
export interface GetCardPrime extends GetPrime {
    card: Card;
    /** 信用卡識別碼。每張信用卡只會對到一組識別碼 */
    card_identifier: string;
    /**
     * 若商戶在 TapPay 後台使用 Co-brand card management 功能，且交易卡號符合設定時，將會回傳此參數，不支援 JKOPAY
     * 商戶於TapPay後台設定的affiliate code management須限制於20字元內且為半形的英數字
     */
    merchant_reference_info: MerchantReferenceInfo;
}
export declare enum UpdateCardStatus {
    /** 欄位已填好，並且沒有問題 */
    Correct = 0,
    /** 欄位還沒有填寫 */
    NotFilledIn = 1,
    /** 欄位有錯誤，此時在 CardView 裡面會用顯示 errorColor */
    Wrong = 2,
    /** 使用者正在輸入中 */
    Typing = 3
}
export interface UpdateResult {
    cardType: 'mastercard' | 'visa' | 'jcb' | 'amex' | 'unionpay' | 'unknown';
    /** true = 全部欄位皆為正確，可以呼叫 getPrime */
    canGetPrime: boolean;
    /**	true = 任何欄位有錯誤 */
    hasError: boolean;
    status: {
        number: UpdateCardStatus;
        expiry: UpdateCardStatus;
        ccv: UpdateCardStatus;
    };
}
export declare type UpdateCallback = (result: UpdateResult) => void;
export {};
