import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasketItem } from 'src/app/shared/models/Basket';
import { IProduct } from 'src/app/shared/models/Product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  Product: IProduct
  quantity = 1
  constructor(private service: ShopService, private router: ActivatedRoute, private bcService: BreadcrumbService, private basketService: BasketService) {
    this.bcService.set('@ProductDetails', '')
  }

  ngOnInit(): void {
    this.getProduct()
  }
  getProduct() {
    this.service.getProduct(+this.router.snapshot.paramMap.get('id')).subscribe(response => {
      this.Product = response
      this.bcService.set('@ProductDetails', this.Product.name)
    }, err => {
      console.log(err)
    })
  }
  Increment() {
    this.quantity++;
  }
  decrementQuantity() {
    if (this.quantity > 1)
      this.quantity--
  }
  AddToBasket(item: IProduct) {
    this.basketService.addItemToBasket(item, this.quantity)
  }
}

