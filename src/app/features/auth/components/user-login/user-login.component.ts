import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TuiAlertService } from '@taiga-ui/core';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class userLoginComponent implements OnInit{

  constructor(private authService:AuthService, private router:Router, private alert: TuiAlertService) {}

  loginForm!: FormGroup;

  industries: string[] = [
    'IT',
    'Media',
  ]

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',Validators.required)
    })
  }

  redirectSignUp() {
    this.router.navigateByUrl('/auth/user/register')
  }
  
  forHiring() {
    this.router.navigateByUrl('/auth/employer/login')
  }

  submitLogin() {
    if (this.loginForm.valid) {

      this.authService.userLogin(this.loginForm.value).subscribe((res) => {
        const statusCode = res.user.status; 
  
        switch (statusCode) {
          case 200:
            this.alert.open('', {
              label: 'Login Successfully',
              status: 'success',
              autoClose: true,
              hasCloseButton: false,
            }).subscribe({
              complete: () => this.router.navigateByUrl('/user/dashboard')    
            })
            break;
        }
  
      }, (err) => {
        this.alert.open('', {
          label: err.error.user.message,
          status: 'error',
          autoClose: false,
          hasCloseButton: true,
        }).subscribe({
          complete: () => console.log('notification closed')        
        })
      });

    } else {
      this.loginForm.markAllAsTouched()
    }

  } 
  

}
