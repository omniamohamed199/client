import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/Product';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  Product: IProduct
  constructor(private service: ShopService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProduct()
  }
  getProduct() {
    this.service.getProduct(+this.router.snapshot.paramMap.get('id')).subscribe(response => {
      this.Product = response
    }, err => {
      console.log(err)
    })
  }
}
