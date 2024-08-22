export enum CURRENCY {
  USD = 'USD',
  EUR = 'EUR',
  UAH = 'UAH',
}

export interface Currency {
  r030: number;
  txt: string;
  rate: number;
  cc: string;
  exchangedate: string;
}

export interface CurrencyToSelect {
  value: number;
  title: string;
}
