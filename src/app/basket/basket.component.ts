import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../shared/models/Basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  basket$: Observable<IBasket>
  constructor(private bsketservice: BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.bsketservice.basket$
  }
  IncermentItemQunatity(item: IBasketItem) {
    this.bsketservice.IncrementItemQuantity(item)
  }
  decermentItemQunatity(item: IBasketItem) {
    this.bsketservice.decrementItemQuantity(item)
  }
  removeItemFromBasekt(item: IBasketItem) {
    this.bsketservice.removeItemFromBasket(item)
  }
}
