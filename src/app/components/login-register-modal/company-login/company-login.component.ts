import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiAlertService } from '@taiga-ui/core';
import { Subscription } from 'rxjs';
import { AuthApiService } from '../../../services/auth-api-service.service';
import { AuthModalService } from '../../../services/auth-modal-service.service';

@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrl: './company-login.component.scss'
})
export class CompanyLoginComponent implements OnInit,OnDestroy{
  @Output() changeView:EventEmitter<string> = new EventEmitter()
  @Output() renderForgotPassword: EventEmitter<boolean> = new EventEmitter()

  successAlertSubscription!:Subscription;
  failureAlertSubscription!:Subscription;

  loginForm!:FormGroup;

  constructor(
    private readonly _router:Router,
    private readonly _authAPIs:AuthApiService,
    private readonly _alert: TuiAlertService,
    private readonly _authModal:AuthModalService,
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required]),
    })
  }

  redirectSignUp() {
    this.changeView.emit('company-register')
  }

  forgotPassword() {
    this.changeView.emit('forgotPassword')
    this.renderForgotPassword.emit(false)
  }

  submitLogin() {
    if (this.loginForm.valid) {
      this._authAPIs.EmployerLogin(this.loginForm.value).subscribe({
        next: response => {
          this.successAlertSubscription = this._alert.open('', {
            label: 'Login Successfully',
            status: 'success',
            autoClose: true,
            hasCloseButton: false,
          }).subscribe()
          this._authModal.closeModal()
          this._router.navigateByUrl('/employer/profile')
        },
        error: err => {
          this.failureAlertSubscription = this._alert.open('', {          
            label: err.error.employer.message,
            status: 'error',
            autoClose: true,
            hasCloseButton: true,
          }).subscribe()
        }
      })
    } else {
      this.loginForm.markAllAsTouched()
    }
  } 

  forJobSearching() {
    this.changeView.emit('user-login')
  }

  ngOnDestroy(): void {
    this.successAlertSubscription?.unsubscribe()
    this.failureAlertSubscription?.unsubscribe()
  }

}
