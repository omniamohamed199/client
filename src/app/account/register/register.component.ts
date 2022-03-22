import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, ControlContainer, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup

  constructor(private fb: FormBuilder, private accountservice: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.createregisterForm()
  }
  createregisterForm() {
    this.registerForm = this.fb.group({
      displayName: [null, [Validators.required]],
      email: [null,
        [Validators.required, Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')],
        [this.validateEmailExistance()]
      ],
      password: [null, Validators.required]
    })
  }
  SubmitData() {
    this.accountservice.register(this.registerForm.value).subscribe(res => {
      this.router.navigate(['/Shop'])
    }, error => {
      console.log(error)
    })
  }
  validateEmailExistance(): AsyncValidatorFn {
    return control => {
      return timer(500).pipe(
        switchMap(() => {
          if (!control.value) {
            return of(null)
          }
          else {
            return this.accountservice.CheckEmailExistnace(control.value).pipe(
              map(res => {
                return res ? { EmailExistance: true } : null
              })
            )
          }
        })
      )
    }
  }
}
