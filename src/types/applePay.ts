export interface MerchantData {
  merchantName: string;
  merchantIdentifier: string;
  countryCode: string;
  currencyCode: string;
}
export interface CartItem {
  itemName: string;
  price: number;
}

export type CartData = Array<CartItem>;
