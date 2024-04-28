import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class userLoginComponent implements OnInit{

  constructor(private authService:AuthService, private router:Router) {}

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
    this.router.navigateByUrl('/auth/user/sign-up')
  }

  submitLogin() {
    // this.authService.login(this.loginForm.value).subscribe((res) => {
    //   this.router.navigateByUrl('/user')
      
    // }, err => console.log(err))
    this.router.navigate(['/user/dashboard'], {replaceUrl:true})
  }

}
