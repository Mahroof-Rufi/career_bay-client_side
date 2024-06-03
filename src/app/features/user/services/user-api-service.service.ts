import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { EditUser } from '../user-store/user.model';
import { environment } from '../../../../environments/environment.development';

@Injectable()
export class UserAPIServiceService {

  constructor(
    private readonly _http:HttpClient
  ) { }

  fetchUserData():Observable<any> {
    return this._http.get(environment.baseURL+'users/')
  }

  fetchUserProfileById(user_id:string):Observable<any> {
    return this._http.post(environment.baseURL + 'users/', {user_id:user_id})
  }

  fetchEmployerProfileById(employer_id:string):Observable<any> {
    return this._http.post(environment.baseURL + 'users/employer-profile', {employer_id:employer_id})
  }

  fetchUsers(pageNo:number, filterQuery:any):Observable<any> {
    return this._http.get(environment.baseURL + `users/users?page=${pageNo}&${filterQuery}`)
  }

  fetchEmployersData(pageNo:number, filterQuery:any):Observable<any> {
    return this._http.get(environment.baseURL + `users/employers?page=${pageNo}&${filterQuery}`)
  }

  userUpdateProfile(newData:EditUser | FormData) {
    return this._http.patch(environment.baseURL+'users/update-profile', newData )
  }

  userUpdateAbout(newAbout:string) {
    return this._http.patch(environment.baseURL + 'users/update-about', { about:newAbout })
  }

  userUpdateExperience(experience:any, exp_id?:string) {
    return this._http.patch(environment.baseURL + 'users/update-experience', { exp:experience, exp_id:exp_id })
  }

  deleteUserExperience(exp_id:string):Observable<any> {
    return this._http.delete(environment.baseURL+`users/delete-experience/${exp_id}`)
  }

  userEditEducation(education:any, education_id?:string | undefined) {
    return this._http.patch(environment.baseURL + 'users/update-education', { education:education, education_id:education_id })
  }

  deleteUserEducation(education_id:string):Observable<any> {
    return this._http.delete(environment.baseURL + `users/delete-education/${education_id}`)
  }

  userUpdateSkills(skills:string[]) {
    return this._http.patch(environment.baseURL + 'users/update-skills', { skills:skills })
  }
 
  changeEmailSendOTP(currentEmail:string):Observable<any> {
    return this._http.post(environment.baseURL + 'users/change-email', { currentEmail:currentEmail })
  }

  userUpdateEmail(data:any):Observable<any> {
    return this._http.patch(environment.baseURL + 'users/change-email', data)
  }

  isUserBlocked():Observable<any> {
    return this._http.get(environment.baseURL + 'user/is-blocked')
  }

}
