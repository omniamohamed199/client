import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LoginForm: FormGroup
  returnUrl: string
  constructor(private accountService: AccountService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.CreateLoginForm()
    this.returnUrl = this.activeRoute.snapshot.queryParams['returnUrl'] || ''
  }

  CreateLoginForm() {
    this.LoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')]),
      password: new FormControl('', Validators.required)
    })
  }

  SubmitData() {
    this.accountService.login(this.LoginForm.value).subscribe(() => {
      this.router.navigate([this.returnUrl])
    }, error => {
      console.log(error)
    })
  }

}
