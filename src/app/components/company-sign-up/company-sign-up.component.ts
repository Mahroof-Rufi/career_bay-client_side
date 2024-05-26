import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiFileLike } from '@taiga-ui/kit';
import { Observable, Subject, Subscription, finalize, map, of, switchMap, timer } from 'rxjs';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';
import { TuiAlertService } from '@taiga-ui/core';
import { AuthApiService } from '../../services/auth-api-service.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-company-sign-up',
  templateUrl: './company-sign-up.component.html',
  styleUrl: './company-sign-up.component.scss'
})
export class CompanySignUpComponent implements OnInit,OnDestroy{
  @Output() changeView:EventEmitter<string> = new EventEmitter()

  OTPSuccessAlertSubscription!:Subscription;
  OTPFailureAlertSubscription!:Subscription;
  registrationSuccessAlertSubscription!:Subscription;
  registrationFailureAlertSubscription!:Subscription;

  registrationForm!: FormGroup;
  document = new FormControl();

  industries = ['IT Services and Consulting','Media']
  states = ['Kerala','Karnataka','Telengana']
  OTP_BTN:string = 'Send OTP'

  startingMinute: number = 1; 
  time: number = 0
  minutes: number = Math.floor(this.time / 60);
  seconds: number = Math.floor(this.time % 60);
  timerInterval: any; 


  constructor(
    private readonly _authAPIs:AuthApiService, 
    private readonly _alert: TuiAlertService,
    private readonly _formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.registrationForm = this._formBuilder.group({
      companyName: ['', Validators.required],
      profile_url: [''], 
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      industry: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      OTP: ['', [Validators.required, Validators.minLength(6)]],
      is_Verified: [true]
    }, { validators: [confirmPasswordValidator] });
  }

  redirectLogin() {
    this.changeView.emit('company-login')
  }

  readonly rejectedFiles$ = new Subject<TuiFileLike | null>();
  readonly loadingFiles$ = new Subject<TuiFileLike | null>();
  readonly loadedFiles$ = this.document.valueChanges.pipe(
    switchMap(file => (file ? this.makeRequest(file) : of(null))),
  );

  onReject(file: TuiFileLike | readonly TuiFileLike[]): void {
    this.rejectedFiles$.next(file as TuiFileLike);
  }

  removeFile(): void {
    this.document.setValue(null);
  }

  clearRejected(): void {
    this.removeFile();
    this.rejectedFiles$.next(null);
  }

  makeRequest(file: TuiFileLike): Observable<TuiFileLike | null> {
    this.loadingFiles$.next(file);

    return timer(0).pipe(
      map(() => {
        if (file.type == 'application/pdf') {
          return file;
        }

        this.rejectedFiles$.next(file);
        return null;
      }),
      finalize(() => this.loadingFiles$.next(null)),
    );
  }


  requestOTP() {
    const email = this.registrationForm.get('email')?.value  
    
    this._authAPIs.employerRequestOTP(email).subscribe({
      next: response => {
        this.OTPSuccessAlertSubscription = this._alert.open('', {
          label: 'OTP send successfully',
          status: 'success',
          autoClose: true,
        }).subscribe()
        this.OTP_BTN = 'Resend OTP'
        this.time = this.startingMinute * 60;
        this.timerInterval = setInterval(() => {
          this.updateTimer();
        }, 1000);
      },

      error: err => {
        this.OTPFailureAlertSubscription = this._alert.open('', {
          label: err.error,
          status: 'error',
          autoClose: false,
          hasCloseButton: true
        }).subscribe()
      }
    })

  }

  submitRegistrationForm() {
    if (this.registrationForm.valid) {
      const companyName = this.registrationForm.value.companyName
      this.registrationForm.patchValue({
        profile_url: `${environment.defaultAvatarApi}/username?username=[${companyName}]`
      });      

      this._authAPIs.employerRegistration(this.registrationForm.value).subscribe({
        next: response => {
          this.changeView.emit('company-login')
          this.registrationSuccessAlertSubscription = this._alert.open('', {
            label: 'Registration successful',
            status: 'success',
            autoClose: false,
            hasCloseButton: true,
          }).subscribe()       
        },

        error: err => {
          this.registrationFailureAlertSubscription = this._alert.open('', {
            label: err.error,
            status: 'error',
            autoClose: false,
            hasCloseButton: true
          }).subscribe()
        }
      })

    } else {
      this.registrationForm.markAllAsTouched()
    }
  }

  updateTimer() {
    if (this.time > 0) {
      this.minutes = Math.floor(this.time / 60);
      this.seconds = Math.floor(this.time % 60);
      this.time--;
    } else {
      this.time = 0
      clearInterval(this.timerInterval); 
    }
  }

  ngOnDestroy(): void {
    this.OTPSuccessAlertSubscription?.unsubscribe()
    this.OTPFailureAlertSubscription?.unsubscribe()
    this.registrationSuccessAlertSubscription?.unsubscribe()
    this.registrationFailureAlertSubscription?.unsubscribe()
  }

}
