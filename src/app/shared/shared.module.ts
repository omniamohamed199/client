import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import { PagerHeaderComponent } from './components/pager-header/pager-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component'


@NgModule({
  declarations: [
    PagerHeaderComponent,
    PagerComponent,
    OrderTotalsComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot()
  ],
  exports:[PaginationModule,PagerHeaderComponent,PagerComponent,OrderTotalsComponent]
})
export class SharedModule { }
