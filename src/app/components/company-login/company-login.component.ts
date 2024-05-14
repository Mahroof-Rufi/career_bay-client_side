import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TuiAlertService } from '@taiga-ui/core';
import { ModalService } from '../../services/modal.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrl: './company-login.component.scss'
})
export class CompanyLoginComponent implements OnInit{

  @Output() changeView:EventEmitter<string> = new EventEmitter()
  @Output() renderForgotPassword: EventEmitter<boolean> = new EventEmitter()

  loginForm!:FormGroup;

  constructor(private router:Router, 
    private authService:AuthService,  
    private alert: TuiAlertService,
    private modalService:ModalService,
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
      this.authService.companyLogin(this.loginForm.value).subscribe((res) => {
        
        const statusCode = res.employer.status; 
    
          switch (statusCode) {
            case 200:
              this.alert.open('', {
                label: 'Login Successfully',
                status: 'success',
                autoClose: true,
                hasCloseButton: false,
              }).subscribe()
              this.modalService.closeModal()
              this.router.navigateByUrl('/employer/profile')
              break;
          }
      }, err => {
        console.log('eer',err)
        this.alert.open('', {          
          label: err.error.employer.message,
          status: 'error',
          autoClose: true,
          hasCloseButton: true,
        }).subscribe({
          complete: () => console.log('notification closed')        
        })
      });
    } else {
      this.loginForm.markAllAsTouched()
    }
  } 

  forJobSearching() {
    // this.router.navigateByUrl('auth/user/login')
    this.changeView.emit('user-login')
  }

}
