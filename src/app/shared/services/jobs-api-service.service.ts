import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class JobsApiServiceService {

  constructor(
    private readonly _http:HttpClient
  ) { }

  userFetchALLJobs():Observable<any> {
    return this._http.get(environment.baseURL+'jobs/')
  }

  userApplyJob(job_id:string):Observable<any> {
    return this._http.patch(environment.baseURL + 'job-applicants/apply-job', { jobId:job_id })
  }

  userVerifyApplication(job_id:string):Observable<any> {
    return this._http.post(environment.baseURL + 'job-applicants/verify-application', { job_id:job_id })
  }

  userLoadAppliedJobs():Observable<any> {
    return this._http.get(environment.baseURL + 'job-applicants/applied-jobs')
  }

  companyFetchJobs(title?:string):Observable<any> {
    let param = new HttpParams()
    if (title) {
      param = param.append('title', title)
    }
    return this._http.get(environment.baseURL + 'jobs/employer-jobs', { params: param });
  }

  companyAddJobPost(jobData:FormData):Observable<any> {
    return this._http.post(environment.baseURL + 'employer/job', jobData)
  }

  companyEditJobPost(jobId:string, jobData:FormData):Observable<any> {
    return this._http.put(environment.baseURL + `employer/job/${jobId}`, jobData)
  }

  companyDeleteJob(jobId:string):Observable<any> {
    return this._http.delete(environment.baseURL + `employer/job/${jobId}`)
  }

  companyLoadJobApplicants(employerId:string,job_id:string):Observable<any> {
    return this._http.post(environment.baseURL + `employer/applicants/${employerId}`, {job_id:job_id})
  }

  updateCandidateStatus(employer_id:string,job_id:string,user_id:string,newStatus:string):Observable<any> {
    return this._http.patch(environment.baseURL + `employer/applicants/${employer_id}`, { job_id:job_id, user_id:user_id, newStatus:newStatus })
  }

}
