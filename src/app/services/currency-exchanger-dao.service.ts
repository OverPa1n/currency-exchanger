import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Currency} from "../models/currency";

@Injectable({providedIn: 'root'})
export class CurrencyExchangerDaoService {
  private http = inject(HttpClient);

  getCurrencyExchangeRate() {
    return this.http.get<Currency[]>('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
  }
}
