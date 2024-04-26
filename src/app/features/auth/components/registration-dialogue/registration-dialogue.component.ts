import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-dialogue',
  templateUrl: './registration-dialogue.component.html',
  styleUrl: './registration-dialogue.component.scss'
})
export class RegistrationDialogueComponent implements OnInit{

  constructor(private authService:AuthService, private router:Router) {}

  loginForm!: FormGroup;
  registrationForm!: FormGroup;

  showSignUpTemplate: boolean = false;
  SignInChecked:string | boolean = 'checked'
  SignUpChecked:string | boolean = false

  industries: string[] = [
    'IT',
    'Media',

  ]

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',Validators.required)
    })

    this.registrationForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', Validators.required),
      jobTitle: new FormControl('', Validators.required),
      industry: new FormControl('', Validators.required),
      DOB: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      OTP: new FormControl('', Validators.required)
    })
  }

  toggleTemplate() {
    if (this.showSignUpTemplate) {
      this.SignInChecked = 'checked'
      this.SignUpChecked = false
      this.showSignUpTemplate = false
    } else {
      this.SignInChecked = false
      this.SignUpChecked = 'checked'
      this.showSignUpTemplate = true
    }
  }

  submitRegistrationForm() {
    this.authService.registration(this.registrationForm.value).subscribe(res => {
        // this.router.navigateByUrl('/login')
    },
    err => {
      console.log(err);
      
    })
  }
}
