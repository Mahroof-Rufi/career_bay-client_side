declare var google: any;
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiAlertService } from '@taiga-ui/core';
import { Subscription } from 'rxjs';
import { AuthModalService } from '../../../services/auth-modal-service.service';
import { environment } from '../../../../environments/environment.development';
import { AuthApiService } from '../../../services/auth-api-service.service';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class userLoginComponent implements OnInit,OnDestroy {
  @Output() changeView:EventEmitter<string> = new EventEmitter()
  @Output() renderForgotPassword: EventEmitter<boolean> = new EventEmitter()

  private _gAuthAPISubscription!:Subscription;
  private _loginAPISubscription!:Subscription;

  private _gAuthSuccessAlertSubscription!:Subscription;
  private _gAuthFailureAlertSubscription!:Subscription;

  private _loginFailureAlertSubscription!:Subscription;
  private _loginSuccessAlertSubscription!:Subscription;

  constructor(
    private readonly _authAPIs: AuthApiService,
    private readonly _router: Router,
    private readonly _alert: TuiAlertService,
    private readonly _authModal :AuthModalService
  ) { }

  loginForm!: FormGroup;

  industries: string[] = [
    'IT',
    'Media',
  ]

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })

    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: (res: any) => this.handleCredentials(res)
    });

    google.accounts.id.renderButton(document.getElementById("google-btn"), {
      theme: 'filled_white',
      size: 'large',
      shape: 'pill',
      width: 350
    })
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]))
  }

  handleCredentials(res: any) {
    if (res) {
      const payLoud = this.decodeToken(res.credential);
      const userData = {
        fullName: payLoud.name,
        email: payLoud.email,
        password: 'cdt45#$%$E%$x',
        google_id: payLoud.sub,
      }
      this._gAuthAPISubscription = this._authAPIs.userGoogleRegistration(userData).subscribe({
        next: response => {
          this._gAuthSuccessAlertSubscription = this._alert.open('', {
            label: 'Login Successfully',
            status: 'success',
            autoClose: true,
            hasCloseButton: false,
          }).subscribe()
          this._router.navigateByUrl('/user/dashboard')
        },
        error: err => {
          this._gAuthFailureAlertSubscription = this._alert.open('', {
            label: err.error.user.message,
            status: 'error',
            autoClose: false,
            hasCloseButton: true,
          }).subscribe()
        }
      })
    }
  }

  redirectSignUp() {
    this.changeView.emit('user-register')
  }

  forHiring() {
    this.changeView.emit('company-login')
  }

  forgotPassword() {
    this.renderForgotPassword.emit(true)
    this.changeView.emit('forgotPassword')
  }

  submitLogin() {
    if (this.loginForm.valid) {
      this._loginAPISubscription = this._authAPIs.userLogin(this.loginForm.value).subscribe({
        next: response => {          
          this._loginSuccessAlertSubscription = this._alert.open('', {
            label: response.user.message,
            status: 'success',
            autoClose: true,
            hasCloseButton: false,
          }).subscribe()
          this._authModal.closeModal()
          this._router.navigateByUrl('/user/dashboard')
        },

        error: err => {          
          this._loginSuccessAlertSubscription = this._alert.open('', {
            label: err.error.user.message,
            status: 'error',
            autoClose: false,
            hasCloseButton: true,
          }).subscribe()
        }
      })
    } else {
      this.loginForm.markAllAsTouched()
    }
  }

  ngOnDestroy(): void {
    this._gAuthAPISubscription?.unsubscribe()
    this._loginAPISubscription?.unsubscribe()

    this._gAuthSuccessAlertSubscription?.unsubscribe()
    this._gAuthFailureAlertSubscription?.unsubscribe()

    this._loginSuccessAlertSubscription?.unsubscribe()
    this._loginFailureAlertSubscription?.unsubscribe()
  }
}
