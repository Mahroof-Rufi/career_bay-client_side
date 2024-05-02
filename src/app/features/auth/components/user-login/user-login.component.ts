declare var google: any;
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TuiAlertService } from '@taiga-ui/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class userLoginComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
    private alert: TuiAlertService,) { }

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
      client_id: '1030200020686-7dolvpabdb7oc0v66ukaabpok6uk4v6c.apps.googleusercontent.com',
      callback: (res: any) => this.handleCrendentials(res)
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

  handleCrendentials(res: any) {
    if (res) {
      const payloud = this.decodeToken(res.credential);
      const userData = {
        fullName: payloud.name,
        email: payloud.email,
        password: 'hctd45#$%$E%$x',
        google_id: payloud.sub,
      }
      this.authService.userGoogleRegistration(userData).subscribe((res) => {
        this.alert.open('', {
          label: 'Login Successfully',
          status: 'success',
          autoClose: true,
          hasCloseButton: false,
        }).subscribe()
        this.router.navigateByUrl('/user/dashboard')
      }, err => {
        this.alert.open('', {
          label: err.error.user.message,
          status: 'error',
          autoClose: false,
          hasCloseButton: true,
        }).subscribe({
          complete: () => console.log('notification closed')
        })
      });
    }
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
        console.log(res);

        switch (statusCode) {
          case 200:
            this.alert.open('', {
              label: 'Login Successfully',
              status: 'success',
              autoClose: true,
              hasCloseButton: false,
            }).subscribe()
            this.router.navigateByUrl('/user/dashboard')
            break;
        }

      }, (err) => {
        console.log(err);

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
