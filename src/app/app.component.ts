import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';
  constructor(private basketservice: BasketService, private accountService: AccountService) {

  }
  ngOnInit(): void {
    this.loadBasketData()
    this.loadCurrentUserData()
  }
  loadBasketData() {
    const basketID = localStorage.getItem('basket_id')
    if (basketID) {
      this.basketservice.getBakset(basketID).subscribe(() => {
        console.log('initialized data')
      })
    }
  }
  loadCurrentUserData() {
    const token = localStorage.getItem('token')
    this.accountService.loadCurrentUser(token).subscribe(() => {
      console.log('Userloaded')
    }, error => {
      console.log(error)
    })
  }
}
