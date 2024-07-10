import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../../../user-store/user.model';
import { Store } from '@ngrx/store';
import { getUserData } from '../../../../../user-store/user.selector';
import { noSpaceAllowed } from '../../../../../../../validators/no-space-allowed.validator';
import { updateUserProfile, updateUserProfileSuccess } from '../../../../../user-store/user.actions';
import { UserProfileEditModalService } from '../../../../../services/user-profile-edit-modal.service';
import { Observable, Subscription } from 'rxjs';
import { AuthApiService } from '../../../../../../../services/auth-api-service.service';
import { UserAPIServiceService } from '../../../../../services/user-api-service.service';
import { TuiAlertService } from '@taiga-ui/core';
import { TuiDay } from '@taiga-ui/cdk';

@Component({
  selector: 'app-user-main-details-edit',
  templateUrl: './user-main-details-edit.component.html',
  styleUrl: './user-main-details-edit.component.scss'
})
export class UserMainDetailsEditComponent implements OnInit, OnDestroy{

  isLoading:boolean = false
  profileForm!:FormGroup;
  cities:string[] = []
  states:string[] = []
  industries:string[] = []
  genders:string[] = ['Male', 'Female', 'Other']

  min = new TuiDay(1980, 1, 1);
  max = TuiDay.currentLocal();

  user_id!:string;
  profile_url:string | undefined | ArrayBuffer | null;

  private _userStoreSubscription!:Subscription;

  constructor(
    private readonly _formBuilder:FormBuilder,
    private readonly _userStore:Store<{ user:User }>,
    private readonly _profileEditService:UserProfileEditModalService,
    private readonly _alert:TuiAlertService,
    private readonly _authAPIs:AuthApiService,
    private readonly _userAPIs:UserAPIServiceService,
  ) {}

  ngOnInit(): void {
    this._userStoreSubscription = this._userStore.select(getUserData).subscribe({
      next: userData => {
        this.profileForm = this._formBuilder.group({
          firstName: [userData.firstName || '', [Validators.required, noSpaceAllowed]],
          lastName: [userData.lastName || '', [noSpaceAllowed]],
          city: [userData.city || '', [Validators.required]],
          state: [userData.state || '', [Validators.required]],
          jobTitle: [userData.jobTitle || '', [Validators.required]],
          industry: [userData.industry || '', [Validators.required]],
          gender: [userData.gender || '', [Validators.required]],
          DOB: ['', [Validators.required]],
          portfolio_url: [userData.portfolio_url || '', [Validators.required]],
          gitHub_url: [userData.gitHub_url || '', [Validators.required]]
        })
        this.profile_url = userData.profile_url
        this.user_id = userData._id
      }
    })
    this._authAPIs.getCities().subscribe((data:any) => this.cities = data)
    this._authAPIs.getStates().subscribe((data:any) => this.states = data)
    this._authAPIs.getIndustries().subscribe((data:any) => this.industries = data)
  }

  handleProfile(event: any) {
    const profile_pic = event.target.files[0];
    if (profile_pic) {

      const reader = new FileReader();
      reader.readAsDataURL(profile_pic);
      reader.onload = () => {
        this.profile_url = reader.result;
      };
    }
  }


  submitNewProfile() {
    if (this.profileForm.valid) {
      this.isLoading = true
      const newFormData = new FormData();
      
      newFormData.append('firstName', this.profileForm.get('firstName')!.value);
      newFormData.append('lastName', this.profileForm.get('lastName')!.value);
      newFormData.append('city', this.profileForm.get('city')!.value);
      newFormData.append('state', this.profileForm.get('state')!.value);
      newFormData.append('jobTitle', this.profileForm.get('jobTitle')!.value);
      newFormData.append('industry', this.profileForm.get('industry')!.value);
      newFormData.append('gender', this.profileForm.get('gender')!.value);
      newFormData.append('DOB', this.profileForm.get('DOB')!.value);
      newFormData.append('portfolio_url', this.profileForm.get('portfolio_url')!.value);
      newFormData.append('gitHub_url', this.profileForm.get('gitHub_url')!.value);

      const profile:HTMLInputElement | null = document.getElementById('profile-file') as HTMLInputElement
      const resume:HTMLInputElement | null = document.getElementById('resume-file') as HTMLInputElement

      if (profile && profile.files && profile.files.length > 0) {
        newFormData.append('profile-file',profile.files[0])       
      }

      if (resume && resume.files && resume.files.length > 0) {
        newFormData.append('resume-file',resume.files[0])       
      }

      this._userAPIs.userUpdateProfile(newFormData).subscribe({
        next: (res:any) => {
          this._profileEditService.closeUserMainDetailsModal()
          this._userStore.dispatch(updateUserProfileSuccess({ newData:res.updatedData }))
        },
        error: err => {
          this._alert.open('', {
            label: err.error.message,
            status: 'error',
            autoClose: false,
            hasCloseButton: true
          }).subscribe()
        }
      })
    } else {
      this.profileForm.markAllAsTouched()
    }
  }

  ngOnDestroy(): void {
    this._userStoreSubscription?.unsubscribe()
  }

}