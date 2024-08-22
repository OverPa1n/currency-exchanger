import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {CurrencyDetailsComponent} from './currency-details/currency-details.component';
import {CurrencyConversionComponent} from "./currency-conversion/currency-conversion.component";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CurrencyDetailsComponent,
    CurrencyConversionComponent,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
