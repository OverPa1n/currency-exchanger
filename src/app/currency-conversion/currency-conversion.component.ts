import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from "@angular/forms";
import {CURRENCY, Currency, CurrencyToSelect} from "../models/currency";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {filter} from "rxjs";

@Component({
  standalone: true,
  selector: 'app-currency-conversion',
  templateUrl: './currency-conversion.component.html',
  styleUrls: ['./currency-conversion.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    NgForOf,
    NgIf
  ]
})
export class CurrencyConversionComponent implements OnInit {
  @Input() currentCurrency!: Currency;
  @Input() currencies!: Currency[];

  public currencyConversionForm = this.initForm();
  public currenciesToSelect!: CurrencyToSelect[];

  ngOnInit() {
    this.currenciesToSelect = this.initCurrenciesToSelect();
    this.subscribeToFormChanges();
  }

  amountValidator(form: FormGroup) {
    const amountControl = form.get('amount');
    const amountControlValue = amountControl?.value;

    if (isNaN(amountControlValue) || amountControlValue < 0) {
      amountControl?.setErrors({invalidValue: true});
    }
  }

  private initForm() {
    return new FormGroup({
      amount: new FormControl(0, Validators.required),
      currency: new FormControl(null, Validators.required),
      result: new FormControl(0)
    }, {validators: this.amountValidator as ValidatorFn});
  }

  private initCurrenciesToSelect() {
    const result = this.currencies?.map(currency => ({value: currency.rate, title: currency.cc}));

    result?.push({title: CURRENCY.UAH, value: 1});

    return result;
  }

  private subscribeToFormChanges() {
    this.currencyConversionForm.valueChanges
      .pipe(
        filter(() => this.currencyConversionForm.valid)
      )
      .subscribe(controls => this.performConversion(controls));
  }

  private getUSDConversion(amount: number, selectedCurrency: CurrencyToSelect) {
    const USDToUAH = this.currentCurrency.rate;

    return (+amount * (USDToUAH! / selectedCurrency.value!)).toFixed(2);
  }

  private getEURConversion(amount: number, selectedCurrency: CurrencyToSelect) {
    const EURToUAH = this.currentCurrency.rate;

    return (+amount * (EURToUAH! / selectedCurrency.value!)).toFixed(2);
  }

  private performConversion(controls: Partial<{amount: number | null; currency: null | CurrencyToSelect; result: number | null;}>) {
    const amount = controls['amount'] as number;
    const selectedCurrency = controls['currency'] as CurrencyToSelect;
    let value;

    if (this.currentCurrency.cc === CURRENCY.USD) {
      value = this.getUSDConversion(amount, selectedCurrency);
    }

    if (this.currentCurrency.cc === CURRENCY.EUR) {
      value = this.getEURConversion(amount, selectedCurrency);
    }

    this.currencyConversionForm.get('result')?.setValue(+value!, {emitEvent: false});
  }
}
