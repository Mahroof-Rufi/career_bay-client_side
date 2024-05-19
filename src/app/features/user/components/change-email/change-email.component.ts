import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrl: './change-email.component.scss'
})
export class ChangeEmailComponent implements OnInit{

  changeEmailForm!:FormGroup;

  constructor(
    private formBuilder:FormBuilder
  ) {}

  ngOnInit(): void {
    this.changeEmailForm = this.formBuilder.group({
      currentEmail: ['', [Validators.required, Validators.email]],
      currentEmailOTP: ['', [Validators.required]],
      newEmail: ['', [Validators.required, Validators.email]],
      newEmailOTP: ['', [Validators.required]]
    })
  }

  sendCurrentEmailOTP() {
    if (this.changeEmailForm.get('currentEmail')?.valid) {

    } else {
      this.changeEmailForm.get('currentEmail')?.markAsTouched()
    }
  }

  sendNewEmailOTP() {
    if (this.changeEmailForm.get('newEmail')?.valid) {

    } else {
      this.changeEmailForm.get('newEmail')?.markAsTouched()
    }
  }

  submitChangeEmail() {
    if (this.changeEmailForm.valid) {

    } else {
      this.changeEmailForm.markAllAsTouched()
    }
  }

}
