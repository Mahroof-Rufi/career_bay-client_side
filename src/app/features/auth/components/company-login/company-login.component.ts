import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrl: './company-login.component.scss'
})
export class CompanyLoginComponent implements OnInit{

  loginForm!:FormGroup;

  constructor(private router:Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    })
  }

  redirectSignUp() {
    this.router.navigateByUrl('/auth/employer/register')
  }

  submitLogin() {}

  forJobSearching() {}

}
