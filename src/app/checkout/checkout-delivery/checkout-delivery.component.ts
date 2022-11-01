import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { IDeliveryMethod } from 'src/app/shared/models/deliveryMethod';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss'],
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() checkOutForm: FormGroup;
  DeliveryMethods: IDeliveryMethod[];

  constructor(private checkoutservice: CheckoutService,private basketservice: BasketService) {}

  ngOnInit(): void {
    this.checkoutservice.getDeliveryMethod().subscribe(
      (res: IDeliveryMethod[]) => {
        this.DeliveryMethods = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  setShippingPrice(deliveryMethod:IDeliveryMethod)
  {
    this.basketservice.SetShippingPrice(deliveryMethod)
  }
}
