import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private route: Router, private toastServ: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error) {
          if (error.status === 400) {
            if (error.error.errors) {
              throw error.error
            }
            else {
              this.toastServ.error(error.error.messsage, error.error.statusCode)
            }
          }
          if (error.status === 401) {
            this.toastServ.error(error.error.messsage, error.error.statusCode)
          }
          if (error.status === 404) {
            this.route.navigateByUrl('/Notfound')
          }
          if (error.status === 500) {
            const NavigationExtra: NavigationExtras = { state: { error: error.error } }
            this.route.navigateByUrl('/server-error', NavigationExtra)
          }
        }
        return throwError(error)
      })
    )
  }
}
