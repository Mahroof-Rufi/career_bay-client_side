import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PostsApiServiceService {

  constructor(
    private readonly _http:HttpClient
  ) { }

  loadPosts():Observable<any> {
    return this._http.get(environment.baseURL + 'posts/')
  }

  fetchPosts() {
    return this._http.get(environment.baseURL + 'employer/post')
  }

  addPost(data:FormData):Observable<any> {
    return this._http.post(environment.baseURL + 'employer/post', data)
  }

  companyEditJobPost(jobId:string, jobData:FormData):Observable<any> {
    return this._http.put(environment.baseURL + 'employer/post', { jobId:jobId, jobData:jobData })
  }
  
}
