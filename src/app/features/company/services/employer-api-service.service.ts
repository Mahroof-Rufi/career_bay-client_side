import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable()
export class EmployerApiServiceService {

  constructor(
    private readonly _http:HttpClient
  ) { }

  fetchEmployerData():Observable<any> {
    return this._http.get(environment.baseURL + 'employers')
  }

  companyUpdateProfile(profileData:FormData):Observable<any> {
    return this._http.put(environment.baseURL + 'employer/update-profile', profileData)
  }

}
