export enum GetPrimeStatus {
  Success = 0,
}

export interface GetPrime {
  status: GetPrimeStatus;
  msg: string;
  /** 交易者的 IP 位置 */
  clientip: string;
}
