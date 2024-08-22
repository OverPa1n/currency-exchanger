import {Component, inject, OnInit, signal} from '@angular/core';
import {CurrencyExchangerDaoService} from "./services/currency-exchanger-dao.service";
import {map} from "rxjs";
import {CURRENCY, Currency} from "./models/currency";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private daoService = inject(CurrencyExchangerDaoService);

  public currencies = signal<Currency[]>([]);

  ngOnInit() {
    this.fetchCurrenciesExchangeRate();
  }

  private fetchCurrenciesExchangeRate() {
    this.daoService.getCurrencyExchangeRate().pipe(
      map((currencies) => currencies.filter(currency => currency.cc === CURRENCY.USD || currency.cc === CURRENCY.EUR))
    ).subscribe(currencies => this.currencies.set(currencies));
  }
}
