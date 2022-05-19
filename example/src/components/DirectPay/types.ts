export type AppCardInfo = {
  valid: boolean;
  values: Record<'cvc' | 'expiry' | 'number' | 'type', string>;
  prime?: string;
};
