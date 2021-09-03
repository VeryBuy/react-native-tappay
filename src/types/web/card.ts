import { GetPrime } from "../common";
import { CardBasicInfo } from "../card";

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
