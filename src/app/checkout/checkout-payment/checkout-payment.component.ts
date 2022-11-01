import { NavigationExtras, Router } from '@angular/router';
import { IOrder } from './../../shared/models/Order';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from './../../basket/basket.service';
import { CheckoutService } from './../checkout.service';
import { Component, Input, OnInit } from '@angular/core';
import { IBasket } from 'src/app/shared/models/Basket';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss'],
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkOutForm: FormGroup;

  constructor(
    private checkoutService: CheckoutService,
    private basketService: BasketService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    const orderToCreate = this.getOrderToCreate(basket);
    this.checkoutService.createOrder(orderToCreate).subscribe(
      (order: IOrder) => {
        const navigationExtras: NavigationExtras = { state: order };
        this.router.navigate(['checkout/success', navigationExtras]);
        this.basketService.deleteLocaleBasket(basket.id);
      },
      (error) => {
        this.toastr.error(error.error);
      }
    );
  }
  getOrderToCreate(basket: IBasket) {
    return {
      basketId: basket.id,
      deliveryMethodId: +this.checkOutForm
        .get('deliveryForm')
        .get('deliveryMethod').value,
      shipToAddress: this.checkOutForm.get('addressFrom').value,
    };
  }
}
