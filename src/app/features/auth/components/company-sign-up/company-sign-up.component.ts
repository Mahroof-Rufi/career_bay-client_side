import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  registrationForm!: FormGroup;
  document = new FormControl();

  industries = ['IT','Media']
  genders = ['Male','Female','Other']


  constructor(private router: Router, private authService:AuthService, private alert: TuiAlertService) { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      companyName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, noSpaceAllowed, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, noSpaceAllowed, Validators.minLength(8)]),
      industry: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      OTP: new FormControl('', [Validators.required, Validators.minLength(6)]),
      is_Verfied: new FormControl(true)
    },{ validators: [confirmPasswordValidator] })
  }

  redirectlogin() {
    this.router.navigateByUrl('/auth/employer/login')
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
    this.authService.companyRequestOTP(email).subscribe(() => {
      this.alert.open('', {
        label: 'OTP send successfully',
        status: 'success',
        autoClose: true,
      }).subscribe({
        complete: () => console.log('notification closed')        
      })
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
      this.authService.companyRegistration(this.registrationForm.value).subscribe((res) => {
        this.alert.open('', {
          label: 'Registration successfull',
          status: 'success',
          autoClose: true,
        }).subscribe({
          complete: () => console.log('notification closed')        
        })       
        this.router.navigateByUrl('auth/employer/login')
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
    } else {
      this.registrationForm.markAllAsTouched()
    }
  }

}
