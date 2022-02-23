import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasketTotals } from '../../models/Basket';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss']
})
export class OrderTotalsComponent implements OnInit {
  BasketTotal$: Observable<IBasketTotals>
  constructor(private baskService: BasketService) { }

  ngOnInit(): void {
    this.BasketTotal$ = this.baskService.basketTotla$
  }

}
