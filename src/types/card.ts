export enum CardType {
  Unknown = -1,
  VISA = 1,
  MasterCard = 2,
  JCB = 3,
  UnionPay = 4,
  AMEX = 5,
}

export enum CardFunding {
  Unknown = -1,
  CreditCard = 0,
  DebitCard = 1,
  PrepaidCard = 2,
}

export interface CardBasicInfo {
  prime: string;
  /** 卡片前六碼 */
  bincode: string;
  /** 卡片後四碼 */
  lastfour: string;
  /** 發卡銀行 */
  issuer: string;
  /** 卡片類別 */
  funding: CardFunding;
  /** 卡片種類 */
  type: CardType;
}

export interface GetCardPrimeResolveValue extends CardBasicInfo {
  /** 信用卡識別碼。每張信用卡只會對到一組識別碼 */
  cardidentifier: string;
  merchantReferenceInfo: {
    /** 商戶在 TapPay 後台的 Co-brand card management 功能專區設定的Affiliated codes */
    affiliate_codes: unknown[];
  };
}

export type { UpdateCallback, CardSetupArgs } from './web/card';
