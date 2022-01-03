import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { IPagination } from '../shared/models/Pagination';
import { IBrands } from '../shared/models/Brands';
import { ITypes } from '../shared/models/ProductTypes';
import { map } from 'rxjs/operators'
import { ShopParams } from '../shared/models/ShopParams';
@Injectable({
  providedIn: 'root'
})
export class ShopService {
  BaseUrl = 'https://localhost:44303/api/'
  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams()

    if (shopParams.brandID !== 0) {
      params = params.append('BrandId', shopParams.brandID)
    }
    if (shopParams.typeID !== 0) {
      params = params.append('TypeId', shopParams.typeID)
    }
    if (shopParams.Search) {
      params = params.append('Search', shopParams.Search)
    }
    params = params.append('Sort', shopParams.sortId)
    params = params.append('PageIndex', shopParams.PageNumber)
    params = params.append('PageIndex', shopParams.PageSize)
    return this.http.get<IPagination>(this.BaseUrl + 'Products', { observe: 'response', params })
      .pipe(
        map(response => {
          return response.body
        })
      )
  }
  getBrands() {
    return this.http.get<IBrands[]>(this.BaseUrl + 'Products/brands')
  }
  getTypes() {
    return this.http.get<ITypes[]>(this.BaseUrl + 'Products/types')
  }
}