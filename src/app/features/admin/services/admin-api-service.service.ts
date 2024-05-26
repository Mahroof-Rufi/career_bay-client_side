import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable()
export class AdminApiServiceService {

  constructor(
    private readonly _http:HttpClient
  ) { }

  adminLoadUsers():Observable<any> {
    return this._http.get(environment.baseURL + 'admin/users')
  }

  adminUserAction(user_id:string):Observable<any> {
    return this._http.patch(environment.baseURL + 'admin/users', { user_id:user_id })
  }
  
  adminLoadCompanies():Observable<any> {
    return this._http.get(environment.baseURL + 'admin/companies')
  }

  adminEmployerAction(employer_id:string):Observable<any> {
    return this._http.patch(environment.baseURL + 'admin/companies', { employer_id:employer_id })
  }

}
