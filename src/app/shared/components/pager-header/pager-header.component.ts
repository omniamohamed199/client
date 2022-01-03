import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pager-header',
  templateUrl: './pager-header.component.html',
  styleUrls: ['./pager-header.component.scss']
})
export class PagerHeaderComponent implements OnInit {
  @Input() totalCount: number
  @Input() PageNumber: number
  @Input() PageSize: number

  constructor() { }

  ngOnInit(): void {
  }

}
