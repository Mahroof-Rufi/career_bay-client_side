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

  adminFetchUserById(user_id:string): Observable<any> {
    return this._http.get(environment.baseURL + `admin/user?user_id=${user_id}`)
  }

  adminUserAction(user_id:string):Observable<any> {
    return this._http.patch(environment.baseURL + 'admin/users', { user_id:user_id })
  }

  getDashboardStatistics(startDate:string, endDate:string): Observable<any> {
    return this._http.get(environment.baseURL + `admin/dashboard-stats?startDate=${startDate}&endDate=${endDate}`)
  }
  
  adminLoadCompanies(pageNo:number, quires?:any):Observable<any> {
    return this._http.get(environment.baseURL + `admin/employers?page=${pageNo}&${quires}`)
  }

  adminFetchEmployerById(employer_id:string):Observable<any> {
    return this._http.get(environment.baseURL + `admin/employer?employer_id=${employer_id}`)
  }

  adminEmployerAction(employer_id:string):Observable<any> {
    return this._http.patch(environment.baseURL + 'admin/employers', { employer_id:employer_id })
  }

  loadJobs(pageNo:number, queries?:any): Observable<any> {
    return this._http.get(environment.baseURL + `admin/jobs?page=${pageNo}&${queries}`)
  }

  getJobById(job_id:string): Observable<any> {
    return this._http.get(environment.baseURL + `jobs/admin-job?job_id=${job_id}`)
  }

  jobAction(job_id:string):Observable<any> {
    return this._http.patch(environment.baseURL + 'admin/jobs', { job_id })
  }

}
