import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { TuiAlertService } from '@taiga-ui/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent implements OnInit{

  loginForm!: FormGroup

  constructor(
    private authService:AuthService,
    private alert: TuiAlertService,
    private router:Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  submitLogin() {
    if (this.loginForm.valid) {
      this.authService.adminLogin(this.loginForm.value).subscribe((res) => {
        console.log(res);
        
        this.alert.open('', {
          label: 'Login Successfull',
          status: 'success',
          autoClose: true,
        }).subscribe()
        this.router.navigateByUrl('/admin/dashboard')  
      }, err => {
        this.alert.open('', {
          label: err.error.admin.message,
          status: 'error',
          autoClose: true,
        }).subscribe({
          complete: () => console.log('notification closed')        
        })
      })
      
    } else {
      this.loginForm.markAllAsTouched()
    }
  }

}
