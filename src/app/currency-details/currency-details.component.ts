import {Component, Input} from '@angular/core';
import {Currency} from "../models/currency";
import {JsonPipe, NgForOf} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {CurrencyConversionComponent} from "../currency-conversion/currency-conversion.component";

@Component({
  standalone: true,
  selector: 'app-currency-details',
  templateUrl: './currency-details.component.html',
  imports: [
    JsonPipe,
    MatCardModule,
    NgForOf,
    CurrencyConversionComponent
  ],
  styleUrls: ['./currency-details.component.scss']
})
export class CurrencyDetailsComponent {
  @Input() currencies!: Currency[];
}
