import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  requestOTP(email:string) {
    return this.http.post('http://localhost:3000/send-otp',{email:email})
  }

  registration(formData:FormGroup):Observable<any> {
    return this.http.post('http://localhost:3000/sign_up', formData)
  }

  login(loginData: FormGroup):Observable<any> {
    return this.http.post('http://localhost:3000/login', loginData, { withCredentials: true })
  }
}
