import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService{

  constructor(
    private readonly _http:HttpClient
  ) { }

  adminLogin(loginData:FormGroup):Observable<any> {
    return this._http.post(environment.baseURL + 'auth/admin/login', loginData)
  }


  
  userRequestOTP(email:string) {
    return this._http.post(environment.baseURL+'auth/user/send-otp',{ email:email })
  }

  userRegistration(formData:FormGroup):Observable<any> {
    return this._http.post(environment.baseURL+'auth/user/register', formData)
  }

  userLogin(loginData: FormGroup):Observable<any> {
    return this._http.post(environment.baseURL+'auth/user/login', loginData)
  }

  userGoogleRegistration(userData: any):Observable<any> {
    return this._http.post(environment.baseURL+'auth/user/g-auth', userData)
  }

  userForgotPasswordRequestOTP(email:string) {
    return this._http.post(environment.baseURL+'auth/user/forgot-password', { email:email })
  }

  userResetPassword(data:FormGroup):Observable<any> {
    return this._http.patch(environment.baseURL+'auth/user/forgot-password', data)
  }




  employerRequestOTP(email:string):Observable<any> {
    return this._http.post(environment.baseURL + 'auth/employer/send-otp', { email:email })
  }

  employerRegistration(companyData:FormGroup):Observable<any> {
    return this._http.post(environment.baseURL + 'auth/employer/register', companyData)
  }

  EmployerLogin(loginData:FormGroup):Observable<any> {
    return this._http.post(environment.baseURL + 'auth/employer/login', loginData)
  }

  companyForgotPasswordRequestOTP(email:string) {
    return this._http.post(environment.baseURL + 'auth/employer/forgot-password', {email:email})
  }

  companyResetPassword(data:FormGroup):Observable<any> {
    return this._http.patch(environment.baseURL + 'auth/employer/forgot-password', data)
  }

}
