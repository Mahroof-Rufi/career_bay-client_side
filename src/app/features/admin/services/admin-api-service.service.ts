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

  adminLoadUsers(pageNo:number, queries?:any):Observable<any> {
    return this._http.get(environment.baseURL + `admin/users?page=${pageNo}&${queries}`)
  }

  adminUserAction(user_id:string):Observable<any> {
    return this._http.patch(environment.baseURL + 'admin/users', { user_id:user_id })
  }
  
  adminLoadCompanies(pageNo:number, quires?:any):Observable<any> {
    return this._http.get(environment.baseURL + `admin/employers?page=${pageNo}&${quires}`)
  }

  adminEmployerAction(employer_id:string):Observable<any> {
    return this._http.patch(environment.baseURL + 'admin/employers', { employer_id:employer_id })
  }

}
