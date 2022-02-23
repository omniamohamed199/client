import { Component } from '@angular/core';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  constructor(private basketservice: BasketService) {
    const basketID = localStorage.getItem('basket_id')
    if (basketID) {
      this.basketservice.getBakset(basketID).subscribe(() => {
        console.log('initialized data')
      })
    }
  }
}
