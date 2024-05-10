import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  userRequestOTP(email:string) {
    return this.http.post('http://localhost:3000/send-otp',{ email:email })
  }

  userRegistration(formData:FormGroup):Observable<any> {
    return this.http.post('http://localhost:3000/sign_up', formData)
  }

  userLogin(loginData: FormGroup):Observable<any> {
    return this.http.post('http://localhost:3000/login', loginData)
  }

  userGoogleRegistration(userData: any):Observable<any> {
    return this.http.post('http://localhost:3000/g-auth', userData)
  }

  userForgorPasswordRequestOTP(email:string) {
    return this.http.post('http://localhost:3000/forgot-password', {email:email})
  }

  userResetPassword(data:FormGroup):Observable<any> {
    return this.http.patch('http://localhost:3000/forgot-password', data)
  }




  companyRequestOTP(email:string):Observable<any> {
    return this.http.post('http://localhost:3000/employer/send-otp', { email:email })
  }

  companyRegistration(companyData:FormGroup):Observable<any> {
    return this.http.post('http://localhost:3000/employer/register', companyData)
  }

  companyLogin(loginData:FormGroup):Observable<any> {
    return this.http.post('http://localhost:3000/employer/login', loginData)
  }

  companyForgorPasswordRequestOTP(email:string) {
    return this.http.post('http://localhost:3000/employer/forgot-password', {email:email})
  }

  companyResetPassword(data:FormGroup):Observable<any> {
    return this.http.patch('http://localhost:3000/employer/forgot-password', data)
  }

  companyUpdateProfile(profileData:FormData):Observable<any> {
    return this.http.put('http://localhost:3000/employer/update-profile', profileData)
  }

  companyFetchJobs():Observable<any> {
    return this.http.get('http://localhost:3000/employer/job')
  }

  companyAddJobPost(jobData:FormData):Observable<any> {
    return this.http.post('http://localhost:3000/employer/job', jobData)
  }

  companyEditJobPost(jobId:string, jobData:FormData):Observable<any> {
    return this.http.put(`http://localhost:3000/employer/job/${jobId}`, jobData)
  }

  companyDeleteJob(jobId:string):Observable<any> {
    return this.http.delete(`http://localhost:3000/employer/job/${jobId}`)
  }

  
  

  adminLogin(loginData:FormGroup):Observable<any> {
    return this.http.post('http://localhost:3000/admin/login', loginData)
  }
}
