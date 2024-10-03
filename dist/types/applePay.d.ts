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
export declare type CartData = Array<CartItem>;
