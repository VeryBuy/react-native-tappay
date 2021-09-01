export enum Status {
  Success = 0,
}

export interface GetPrime {
  status: Status;
  msg: string;
  /** 交易者的 IP 位置 */
  clientip: string;
}
