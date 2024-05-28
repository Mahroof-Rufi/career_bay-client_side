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

  fetchPosts(pageNo:number) {
    console.log('going to start');
    
    return this._http.get(environment.baseURL + `posts/employer-posts?page=${pageNo}`)
  }

  addPost(data:FormData):Observable<any> {
    return this._http.post(environment.baseURL + 'posts/employer-posts', data)
  }

  companyEditJobPost(jobId:string, jobData:FormData):Observable<any> {
    return this._http.put(environment.baseURL + 'employer/post', { jobId:jobId, jobData:jobData })
  }
  
}
