import { Component, OnInit } from '@angular/core';
import { User, UserMainDetails, education, experience } from '../../../../store/user-store/user.model';
import { Store } from '@ngrx/store';
import { getUserData } from '../../../../store/user-store/user.selector';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{

  userMainDetails!:UserMainDetails;
  about:string | undefined;
  experiences: experience[] | undefined;
  educations: education[] | undefined
  skills: string[] | undefined

  constructor(
    private userStore:Store<{ user:User }>
  ) {}

  ngOnInit(): void {
    this.userStore.select(getUserData).subscribe((res) => {
      this.userMainDetails = {
        _id: res._id,
        email: res.email,
        firstName: res.firstName,
        lastName: res.lastName,
        profile_url: res.profile_url,
        jobTitle: res.jobTitle,
        industry: res.industry,
        city: res.city,
        state: res.state,
        remort: res.remort,
        gender: res.gender,
        DOB: res.DOB,
        resume_url: res.resume_url,
        phone: res.phone,
        portfolio_url: res.portfolio_url,
        gitHub_url: res.gitHub_url
      }
      this.about = res.about
      this.experiences = res.experiences
      this.educations = res.educations
      this.skills = res.skills     
    })
  }

}