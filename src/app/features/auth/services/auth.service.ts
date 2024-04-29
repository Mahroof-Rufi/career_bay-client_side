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

  companyRequestOTP(email:string):Observable<any> {
    return this.http.post('http://localhost:3000/employer/send-otp', { email:email })
  }

  companyRegistration(companyData:FormGroup):Observable<any> {
    return this.http.post('http://localhost:3000/employer/register', companyData)
  }

  companyLogin(loginData:FormGroup):Observable<any> {
    return this.http.post('http://localhost:3000/employer/login', loginData)
  }

  adminLogin(loginData:FormGroup):Observable<any> {
    return this.http.post('http://localhost:3000/admin/login', loginData)
  }
}