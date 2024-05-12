import { Component, ElementRef, ViewChild } from '@angular/core';
import { Employer } from '../../../../store/employer-store/employer.model';
import {TuiCountryIsoCode} from '@taiga-ui/i18n';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { EmployerEditProfileModalService } from '../../../../services/employer-edit-profile-modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {

  employerData!: Employer;
  industries:string[] = ['IT Service and Consulting','Media']
  states:string[] = ['Kerala', 'Karnataka', 'Telengana']
  noOfWorksRange:string[] = ['0 - 50', '50 - 100', '100 - 250', '250 - 500']
  document = new FormControl();
  updateProfileForm!:FormGroup;
  formBuilder: any;

  readonly countries = Object.values(TuiCountryIsoCode);
  countryIsoCode = TuiCountryIsoCode.IN

  constructor(
    private authService:AuthService,
    private editProfileModalService:EmployerEditProfileModalService,
    private router:Router,
  ) {}

  ngOnInit(): void {
    const employerDataString = localStorage.getItem('employerData');
    
    if (employerDataString) {
      const employerData: Employer = JSON.parse(employerDataString);
      // this.employerState.setEmployer(employerData)
    }
    
    // this.employerState.getEmployer().subscribe((data) => {
    //   this.employerData = data
    // })

    this.updateProfileForm = new FormGroup({
      companyName: new FormControl(this.employerData.companyName, Validators.required),
      industry: new FormControl(this.employerData.industry, Validators.required),
      city: new FormControl(this.employerData.city, Validators.required),
      state: new FormControl(this.employerData.state, Validators.required),
      noOfWorkersRange: new FormControl(this.employerData.noOfWorkersRange, Validators.required),
      phone: new FormControl(this.employerData.phone, Validators.required),
      web_url: new FormControl(this.employerData.web_url),
      instagram_url: new FormControl(this.employerData.instagram_url, Validators.required),
      about: new FormControl(this.employerData.about, [Validators.required, Validators.maxLength(600)]),
      X_url: new FormControl(this.employerData.X_url, Validators.required)
    });
  }

  imageUrl: string | ArrayBuffer | null = null;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
    }
  }

  submitUpdateProfile() {
    if(this.updateProfileForm.valid) {
      let formData = new FormData()

      formData.append('companyName', this.updateProfileForm.get('companyName')!.value);
      formData.append('industry', this.updateProfileForm.get('industry')!.value);
      formData.append('city', this.updateProfileForm.get('city')!.value);
      formData.append('state', this.updateProfileForm.get('state')!.value);
      formData.append('noOfWorkersRange', this.updateProfileForm.get('noOfWorkersRange')!.value);
      formData.append('phone', this.updateProfileForm.get('phone')!.value);
      formData.append('web_url', this.updateProfileForm.get('web_url')!.value);
      formData.append('instagram_url', this.updateProfileForm.get('instagram_url')!.value);
      formData.append('X_url', this.updateProfileForm.get('X_url')!.value);
      formData.append('about', this.updateProfileForm.get('about')!.value);
      formData.append('profile_url', this.employerData.profile_url);
      formData.append('email', this.employerData.email);

      const fileInput:HTMLInputElement | null = document.getElementById('input-file') as HTMLInputElement

      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        formData.append('profile-img',fileInput.files[0])       
      } 
      
      this.authService.companyUpdateProfile(formData).subscribe((res) => {
        console.log(res);
      localStorage.setItem('employerData',JSON.stringify(res.updatedData))
      // this.employerState.setEmployer(res.updatedData)
      this.editProfileModalService.closeModal()
      this.router.navigateByUrl('/employer/profile')
      }, (err) => {
        console.log(err);
        
      })

    } else {
      this.updateProfileForm.markAllAsTouched()
    }  
  }

}
