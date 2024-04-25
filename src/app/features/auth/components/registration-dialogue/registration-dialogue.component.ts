import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-dialogue',
  templateUrl: './registration-dialogue.component.html',
  styleUrl: './registration-dialogue.component.scss'
})
export class RegistrationDialogueComponent implements OnInit{

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
      jobTitle: new FormControl(''),
      industry: new FormControl(''),
      DOB: new FormControl(''),
      gender: new FormControl(''),
      OTP: new FormControl('')
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
}
