import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCounter = 0
  constructor(private spinService: NgxSpinnerService) { }

  busy() {
    this.busyRequestCounter++;
    this.spinService.show(undefined, {
      type: 'square-jelly-box',
      bdColor: 'rgba(255,255,255,0.7)',
      color: 'gray',
    })
  }
  idle() {
    this.busyRequestCounter--;
    if (this.busyRequestCounter <= 0) {
      this.busyRequestCounter = 0
      this.spinService.hide()
    }
  }
}
