import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss']
})
export class ServerErrorComponent implements OnInit {
  error: any
  constructor(private route: Router) {
    const NavigationExtra = this.route.getCurrentNavigation() //this navigationExtra is availble only in constructor 
    this.error = NavigationExtra?.extras?.state?.error
  }

  ngOnInit(): void {
  }

}
