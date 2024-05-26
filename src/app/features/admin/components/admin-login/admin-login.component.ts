import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiAlertService } from '@taiga-ui/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthApiService } from '../../../../services/auth-api-service.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent implements OnInit,OnDestroy{

  private _loginSubscription!:Subscription;
  private _loginSuccessAlertSubscription!:Subscription;
  private _loginFailureAlertSubscription!:Subscription;

  loginForm!: FormGroup

  constructor(
    private readonly _authAPIs:AuthApiService,
    private readonly _alert: TuiAlertService,
    private readonly _router:Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  submitLogin() {
    if (this.loginForm.valid) {
      this._loginSubscription = this._authAPIs.adminLogin(this.loginForm.value).subscribe({
        next: response => {
          this._loginSuccessAlertSubscription = this._alert.open('', {
            label: 'Login Successful',
            status: 'success',
            autoClose: true,
          }).subscribe()
          this._router.navigateByUrl('/admin/dashboard')
        },
        error: err => {
          this._loginFailureAlertSubscription = this._alert.open('', {
            label: err.error.admin.message,
            status: 'error',
            autoClose: true,
          }).subscribe()
        }
      })
      
    } else {
      this.loginForm.markAllAsTouched()
    }
  }

  ngOnDestroy(): void {
    this._loginSubscription?.unsubscribe()

    this._loginSuccessAlertSubscription?.unsubscribe()
    this._loginFailureAlertSubscription?.unsubscribe()
  }

}
