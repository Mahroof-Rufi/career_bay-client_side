import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../../store/user-store/user.model';
import { Store } from '@ngrx/store';
import { getUserData } from '../../../../store/user-store/user.selector';
import { noSpaceAllowed } from '../../../../validators/no-space-allowed.validator';
import { updateUserAbout } from '../../../../store/user-store/user.actions';
import { AuthService } from '../../../../services/auth.service';
import { TuiDay } from '@taiga-ui/cdk';
import { UserProfileEditModalService } from '../../services/user-profile-edit-modal.service';

@Component({
  selector: 'app-user-main-details-edit',
  templateUrl: './user-main-details-edit.component.html',
  styleUrl: './user-main-details-edit.component.scss'
})
export class UserMainDetailsEditComponent implements OnInit{

  profileForm!:FormGroup;
  states:string[] = ['Kerala', 'TamilNadu', 'Karnataka']
  genders:string[] = ['Male', 'Female', 'Other']

  user_id!:string;
  profile_url:string | undefined | ArrayBuffer | null;

  constructor(
    private formBuilder:FormBuilder,
    private userStore:Store<{ user:User }>,
    private profileEditService:UserProfileEditModalService
  ) {}

  ngOnInit(): void {
    this.userStore.select(getUserData).subscribe((userData) => {
      this.profileForm = this.formBuilder.group({
        firstName: [userData.firstName || '', [Validators.required, noSpaceAllowed]],
        lastName: [userData.lastName || '', [Validators.required, noSpaceAllowed]],
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
    })
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
      this.userStore.dispatch(updateUserAbout({ newData:newFormData, userId:this.user_id }))
      this.profileEditService.closeUserMainDetailsModal()
    } else {
      console.log('eklse');
      this.profileForm.markAllAsTouched()
      
    }
  }

}

function convertTuiDayToDate(tuiDay: TuiDay): Date {
  const { year, month, day } = tuiDay;
  return new Date(year, month - 1, day);
}