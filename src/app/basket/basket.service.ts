import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  Basket,
  IBasket,
  IBasketItem,
  IBasketTotals,
} from '../shared/models/Basket';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';
import { IProduct } from '../shared/models/Product';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  BaseUrl = environment.APIUrl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
  basketTotla$ = this.basketTotalSource.asObservable();
  shipping = 0;
  constructor(private http: HttpClient) {}

  SetShippingPrice(deliverMethod: IDeliveryMethod) {
    this.shipping = deliverMethod.price;
    this.calculatTotals();
  }

  getBakset(id: string) {
    return this.http.get(this.BaseUrl + 'Basket?id=' + id).pipe(
      map((response: IBasket) => {
        this.basketSource.next(response);
        this.calculatTotals();
      })
    );
  }
  setBasket(Basket: IBasket) {
    return this.http.post(this.BaseUrl + 'Basket', Basket).subscribe(
      (response: IBasket) => {
        this.basketSource.next(response);
        this.calculatTotals();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(Item: IProduct, quantity = 1) {
    const ItemToAdd: IBasketItem = this.mapProductItemToBasketItem(
      Item,
      quantity
    );
    const Basket = this.getCurrentBasketValue() ?? this.CreateBasket();
    Basket.items = this.addOrUpdateItem(Basket.items, ItemToAdd, quantity);
    this.setBasket(Basket);
  }
  private addOrUpdateItem(
    items: IBasketItem[],
    ItemToAdd: IBasketItem,
    quantity: number
  ): IBasketItem[] {
    const index = items.findIndex((i) => i.id == ItemToAdd.id);
    if (index == -1) {
      items.push(ItemToAdd);
    } else {
      items[index].quantity += quantity;
    }
    return items;
  }

  private CreateBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }
  private mapProductItemToBasketItem(
    Item: IProduct,
    quantity: number
  ): IBasketItem {
    return {
      id: Item.id,
      productName: Item.name,
      price: Item.price,
      pictureUrl: Item.pictureUrl,
      brand: Item.productBrand,
      type: Item.productType,
      quantity,
    };
  }
  private calculatTotals() {
    const shipping = this.shipping;
    const Basket = this.getCurrentBasketValue();
    const subTotal = Basket.items.reduce((a, b) => b.price * b.quantity + a, 0);
    const total = shipping + subTotal;
    this.basketTotalSource.next({ shipping, subTotal, total });
  }
  IncrementItemQuantity(item: IBasketItem) {
    const Basket = this.getCurrentBasketValue();
    const FoundItemIndex = Basket.items.findIndex((x) => x.id === item.id);
    Basket.items[FoundItemIndex].quantity++;
    this.setBasket(Basket);
  }
  decrementItemQuantity(item: IBasketItem) {
    const Basket = this.getCurrentBasketValue();
    const FoundItemIndex = Basket.items.findIndex((x) => x.id === item.id);
    if (Basket.items[FoundItemIndex].quantity > 1) {
      Basket.items[FoundItemIndex].quantity--;
      this.setBasket(Basket);
    } else {
      this.removeItemFromBasket(item);
    }
  }
  removeItemFromBasket(item: IBasketItem) {
    const Basket = this.getCurrentBasketValue();
    if (Basket.items.some((x) => x.id == item.id)) {
      Basket.items = Basket.items.filter((x) => x.id !== item.id);
      if (Basket.items.length > 0) {
        this.setBasket(Basket);
      } else {
        this.deleteBasket(Basket);
      }
    }
  }
  deleteLocaleBasket(basketId)
  {
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id');
  }
  deleteBasket(Basket: IBasket) {
    return this.http.delete(this.BaseUrl + 'Basket?id=' + Basket.id).subscribe(
      () => {
        this.basketSource.next(null);
        this.basketTotalSource.next(null);
        localStorage.removeItem('basket_id');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
