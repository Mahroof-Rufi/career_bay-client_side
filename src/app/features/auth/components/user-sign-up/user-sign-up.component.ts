import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TuiAlertService } from '@taiga-ui/core';
import { noSpaceAllowed } from '../../validators/no-space-allowed.validator';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.component.html',
  styleUrl: './user-sign-up.component.scss'
})
export class UserSignUpComponent implements OnInit{

  constructor(private router:Router, private authService:AuthService, private alert: TuiAlertService) {}

  registrationForm!: FormGroup;
  otpButton:string = 'Send OTP'

  industries: string[] = [
    'IT',
    'Media'
  ]

  genders: string[] = [
    'Male',
    'Female',
    'Other'
  ]

  ngOnInit(): void {
      this.registrationForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, noSpaceAllowed]),
      lastName: new FormControl('',[noSpaceAllowed]),
      email: new FormControl('', [Validators.required, Validators.email, noSpaceAllowed]),
      password: new FormControl('', [Validators.required, noSpaceAllowed, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, noSpaceAllowed, Validators.minLength(8)]),
      jobTitle: new FormControl('', Validators.required),
      industry: new FormControl('', Validators.required),
      DOB: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      OTP: new FormControl('', [Validators.required, noSpaceAllowed, Validators.minLength(6)])
    },{ validators: [confirmPasswordValidator]})

  }

  submitRegistrationForm() {
    if (this.registrationForm.valid) {
      this.authService.userRegistration(this.registrationForm.value).subscribe((res) => {
        this.alert.open('', {
          label: 'Registration successfull',
          status: 'success',
          autoClose: true,
          hasCloseButton: false
        }).subscribe({
          complete: () => this.router.navigateByUrl('auth/user/login')       
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
    } else {
      this.registrationForm.markAllAsTouched()
    }
  }

  redirectlogin() {
    this.router.navigateByUrl('/auth/user/login')
  }

  requestOTP() {
    const email = this.registrationForm.get('email')?.value    
    this.authService.userRequestOTP(email).subscribe(() => {
      this.otpButton = 'Resend OTP'
      this.alert.open('', {
        label: 'OTP send successfully',
        status: 'success',
        autoClose: true,
    }).subscribe({
        complete: () => console.log('notification closed')        
      })
    },(err: any) => {
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
}
