import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket, IBasketItem } from '../../models/Basket';

@Component({
  selector: 'app-basket-summery',
  templateUrl: './basket-summery.component.html',
  styleUrls: ['./basket-summery.component.scss'],
})
export class BasketSummeryComponent implements OnInit {
  basket$: Observable<IBasket>;
  @Input() isBasket = true;
  @Output() decrement: EventEmitter<IBasketItem> =
    new EventEmitter<IBasketItem>();
  @Output() increment: EventEmitter<IBasketItem> =
    new EventEmitter<IBasketItem>();
  @Output() remove: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }
  decermentItemQunatity(item) {
    this.decrement.emit(item);
  }
  IncermentItemQunatity(item) {
    this.increment.emit(item);
  }
  removeItemFromBasekt(item) {
    this.remove.emit(item);
  }
}
