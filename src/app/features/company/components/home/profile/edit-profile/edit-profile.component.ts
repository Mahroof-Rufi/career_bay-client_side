import { Component, OnDestroy } from '@angular/core';
import { Employer } from '../../../../store/employer.model';
import { TuiCountryIsoCode } from '@taiga-ui/i18n';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployerEditProfileModalService } from '../../../../services/employer-edit-profile-modal.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getEmployerData } from '../../../../store/employer.selector';
import { updateEmployer } from '../../../../store/employer.actions';
import { EmployerApiServiceService } from '../../../../services/employer-api-service.service';
import { Subscription } from 'rxjs';
import { TuiAlertService } from '@taiga-ui/core';
import { AuthApiService } from '../../../../../../services/auth-api-service.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnDestroy{

  isLoading:boolean = false
  employerData!: Employer;
  industries:string[] = []
  cities:string[] = []
  states:string[] = []
  noOfWorksRange:string[] = ['0 - 50', '50 - 100', '100 - 250', '250 - 500']
  document = new FormControl();
  updateProfileForm!:FormGroup;

  readonly countries = Object.values(TuiCountryIsoCode);
  countryIsoCode = TuiCountryIsoCode.IN

  private _employerStoreSubscription!:Subscription;
  private _employerAPIsSubscription!:Subscription;

  constructor(
    private readonly _employerAPIs:EmployerApiServiceService,
    private readonly _editProfileModal:EmployerEditProfileModalService,
    private readonly _router:Router,
    private readonly _authAPIs:AuthApiService,
    private readonly _employerStore:Store<{ employer:Employer }>,
    private readonly _formBuilder: FormBuilder,
    private readonly _alert:TuiAlertService,
  ) {}

  ngOnInit(): void {
    this._employerStore.select(getEmployerData).subscribe((res) => {
      this.employerData = res
    })

    this.updateProfileForm = this._formBuilder.group({
      companyName: [this.employerData.companyName, [Validators.required]],
      industry: [this.employerData.industry, [Validators.required]],
      city: [this.employerData.city, [Validators.required]],
      state: [this.employerData.state, [Validators.required]],
      noOfWorkersRange: [this.employerData.noOfWorkersRange, [Validators.required]],
      phone: [this.employerData.phone, [Validators.required]],
      web_url: [this.employerData.web_url],
      instagram_url: [this.employerData.instagram_url, [Validators.required]],
      about: [this.employerData.about, [Validators.required, Validators.maxLength(600)]],
      X_url: [this.employerData.X_url, [Validators.required]]
    });

    this._authAPIs.getCities().subscribe((data:any) => this.cities = data)
    this._authAPIs.getCities().subscribe((data:any) => this.states = data)
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
      this.isLoading = true
      let formData = new FormData()

      formData.append('companyName', this.updateProfileForm.get('companyName')?.value);
      formData.append('industry', this.updateProfileForm.get('industry')?.value);
      formData.append('city', this.updateProfileForm.get('city')?.value);
      formData.append('state', this.updateProfileForm.get('state')?.value);
      formData.append('noOfWorkersRange', this.updateProfileForm.get('noOfWorkersRange')?.value);
      formData.append('phone', this.updateProfileForm.get('phone')?.value);
      formData.append('web_url', this.updateProfileForm.get('web_url')?.value);
      formData.append('instagram_url', this.updateProfileForm.get('instagram_url')?.value);
      formData.append('X_url', this.updateProfileForm.get('X_url')?.value);
      formData.append('about', this.updateProfileForm.get('about')?.value);
      formData.append('profile_url', this.employerData.profile_url);
      formData.append('email', this.employerData.email);

      const fileInput:HTMLInputElement | null = document.getElementById('input-file') as HTMLInputElement

      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        formData.append('profile-img',fileInput.files[0])       
      } 
      
      this._employerAPIs.companyUpdateProfile(formData).subscribe({
        next: response => {
          this._employerStore.dispatch(updateEmployer({ newData:response.updatedData }))
          this._editProfileModal.closeModal()
          this._router.navigateByUrl('/employer/profile')
        },
        error: err => {
          this.isLoading = false
          this._alert.open('', {
            label: err.error.message,
            status: 'error',
            autoClose: true,
            hasCloseButton: true
          }).subscribe()
        }
      })

    } else {
      this.updateProfileForm.markAllAsTouched()
    }  
  }

  ngOnDestroy(): void {
    this._employerAPIsSubscription?.unsubscribe()
    this._employerStoreSubscription?.unsubscribe()
  }

}
