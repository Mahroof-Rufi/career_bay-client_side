import { Component, OnDestroy, OnInit } from '@angular/core';
import { User, UserMainDetails, education, experience } from '../../../user-store/user.model';
import { Store } from '@ngrx/store';
import { getUserData } from '../../../user-store/user.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit, OnDestroy{

  userMainDetails!:UserMainDetails;
  about:string | undefined;
  experiences: experience[] | undefined;
  educations: education[] | undefined
  skills: string[] | undefined

  private _userStoreSubscription!:Subscription;

  constructor(
    private readonly _userStore:Store<{ user:User }>
  ) {}

  ngOnInit(): void {
    this._userStoreSubscription = this._userStore.select(getUserData).subscribe({
      next: response => {
        this.userMainDetails = {
          _id: response._id,
          email: response.email,
          firstName: response.firstName,
          lastName: response.lastName,
          profile_url: response.profile_url,
          jobTitle: response.jobTitle,
          industry: response.industry,
          city: response.city,
          state: response.state,
          remort: response.remort,
          gender: response.gender,
          DOB: response.DOB,
          resume_url: response.resume_url,
          phone: response.phone,
          portfolio_url: response.portfolio_url,
          gitHub_url: response.gitHub_url
        }
        this.about = response.about
        this.experiences = response.experiences
        this.educations = response.educations
        this.skills = response.skills 
      }
    })
  }

  ngOnDestroy(): void {
    this._userStoreSubscription?.unsubscribe()
  }

}