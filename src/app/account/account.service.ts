import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/models/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  BaseUrl = environment.APIUrl
  private CurrentUserSource = new ReplaySubject<IUser>(1)
  currentUser$ = this.CurrentUserSource.asObservable()
  constructor(private http: HttpClient, private route: Router) { }
  loadCurrentUser(token) {
    if (token == null) {
      this.CurrentUserSource.next(null)
      return of(null)
    }
    
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${token}`)

    return this.http.get(this.BaseUrl + 'Account', { headers }).pipe(
      map((user: IUser) => {
        localStorage.setItem('token', user.token)
        this.CurrentUserSource.next(user)
      })
    )
  }

  login(values) {
    return this.http.post(this.BaseUrl + 'Account/login', values).pipe(
      map((user: IUser) => {
        localStorage.setItem('token', user.token)
        this.CurrentUserSource.next(user)
      })
    )
  }
  register(values) {
    return this.http.post(this.BaseUrl + 'Account/register', values).pipe(
      map((user: IUser) => {
        localStorage.setItem('token', user.token)
        this.CurrentUserSource.next(user)
      })
    )
  }
  logout() {
    this.CurrentUserSource.next(null)
    this.route.navigate(['/'])
    localStorage.removeItem('token')
  }
  CheckEmailExistnace(email: string) {
    return this.http.get(this.BaseUrl + 'Account/emailexists?email=' + email)
  }
}
