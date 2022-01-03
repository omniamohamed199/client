import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrands } from '../shared/models/Brands';
import { IPagination } from '../shared/models/Pagination';
import { IProduct } from '../shared/models/Product';
import { ITypes } from '../shared/models/ProductTypes';
import { ShopParams } from '../shared/models/ShopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: IProduct[]
  Brands: IBrands[]
  Types: ITypes[]
  ShopParams = new ShopParams()
  totalCount: number
  SortOptions = [
    { 'name': 'Alphabitical', value: 'name' },
    { 'name': 'Price : Low to High', value: 'priceAsc' },
    { 'name': 'Price : High to Low', value: 'priceDesc' }
  ]
  @ViewChild('search', { static: true }) SearchTerm: ElementRef
  constructor(private shopservice: ShopService) { }

  ngOnInit(): void {
    this.getProducts()
    this.getBrands()
    this.getTypes()
  }

  getProducts() {
    this.shopservice.getProducts(this.ShopParams).subscribe(res => {
      this.products = res.data
      this.ShopParams.PageNumber = res.pageIndex
      this.ShopParams.PageSize = res.pageSize
      this.totalCount = res.count
    })
  }
  getBrands() {
    this.shopservice.getBrands().subscribe(response => {
      this.Brands = [{ id: 0, name: 'All' }, ...response]
    })
  }
  getTypes() {
    this.shopservice.getTypes().subscribe(response => {
      this.Types = [{ id: 0, name: 'All' }, ...response]
    })
  }
  OnBrandSelected(branId: number) {
    this.ShopParams.brandID = branId
    this.ShopParams.PageNumber = 1
    this.getProducts()
  }
  OnTypeSelected(typeId: number) {
    this.ShopParams.typeID = typeId
    this.ShopParams.PageNumber = 1
    this.getProducts()
  }
  OnSortSelected(sortId: string) {
    this.ShopParams.sortId = sortId
    this.getProducts()
  }
  OnPageChange(event: number) {
    if (this.ShopParams.PageNumber !== event) {
      this.ShopParams.PageNumber = event
      this.getProducts()
    }
  }
  OnSearch() {
    this.ShopParams.Search = this.SearchTerm.nativeElement.value
    this.ShopParams.PageNumber = 1
    this.getProducts()
  }
  OnReset() {
    this.SearchTerm.nativeElement.value = ''
    this.ShopParams = new ShopParams()
    this.getProducts()
  }
}
