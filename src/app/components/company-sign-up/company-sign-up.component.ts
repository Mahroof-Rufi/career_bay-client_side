import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiFileLike } from '@taiga-ui/kit';
import { Observable, Subject, finalize, map, of, switchMap, timer } from 'rxjs';
import { noSpaceAllowed } from '../../validators/no-space-allowed.validator';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';
import { AuthService } from '../../services/auth.service';
import { TuiAlertService } from '@taiga-ui/core';

@Component({
  selector: 'app-company-sign-up',
  templateUrl: './company-sign-up.component.html',
  styleUrl: './company-sign-up.component.scss'
})
export class CompanySignUpComponent implements OnInit {

  @Output() changeView:EventEmitter<string> = new EventEmitter()

  registrationForm!: FormGroup;
  document = new FormControl();

  industries = ['IT Services and Consulting','Media']
  states = ['Kerala','Karnataka','Telengana']
  OTP_BTN:string = 'Send OTP'


  constructor(
    private authService:AuthService, 
    private alert: TuiAlertService,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
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

  redirectlogin() {
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
    this.authService.companyRequestOTP(email).subscribe((res) => {
      console.log(res);
      
      this.alert.open('', {
        label: 'OTP send successfully',
        status: 'success',
        autoClose: true,
      }).subscribe()
      this.OTP_BTN = 'Resend OTP'
    }, (err: any) => {
      console.log(err);
      this.alert.open('', {
        label: err.error,
        status: 'error',
        autoClose: false,
        hasCloseButton: true
      }).subscribe({
              
      })
    })
  }

  submitRegistrationForm() {
    if (this.registrationForm.valid) {

      this.registrationForm.patchValue({
        profile_url: `https://avatar.iran.liara.run/username?username=[${this.registrationForm.value.companyName}]`
      });      

      this.authService.companyRegistration(this.registrationForm.value).subscribe((res) => {
        this.alert.open('', {
          label: 'Registration successfull',
          status: 'success',
          autoClose: true,
        }).subscribe()       
        this.changeView.emit('company-login')
      }, (err: any) => {
        this.alert.open('', {
          label: err.error,
          status: 'error',
          autoClose: false,
          hasCloseButton: true
        }).subscribe()
      })
    } else {
      this.registrationForm.markAllAsTouched()
    }
  }

}
