import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import { PagerHeaderComponent } from './components/pager-header/pager-header.component';
import { PagerComponent } from './components/pager/pager.component'


@NgModule({
  declarations: [
    PagerHeaderComponent,
    PagerComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot()
  ],
  exports:[PaginationModule,PagerHeaderComponent,PagerComponent]
})
export class SharedModule { }
