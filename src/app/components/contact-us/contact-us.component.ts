import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent implements OnInit{

  contactForm!: FormGroup;

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      subject: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
    });
  }

  contactUsFromSubmit() {
    console.log(this.contactForm);
  }
  
}
