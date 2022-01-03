import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {
  @Input() totalCount: number
  @Input() PageSize: number
  @Output() PageChange = new EventEmitter<number>()
  constructor() { }

  ngOnInit(): void {
  }

  OnPageChanged(event: any) {
    this.PageChange.emit(event.page)
  }
}
