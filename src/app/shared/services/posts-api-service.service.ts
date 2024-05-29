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

  loadPosts(pageNo:number):Observable<any> {
    return this._http.get(environment.baseURL + `posts?page=${pageNo}`)
  }

  fetchPosts(pageNo:number) {
    return this._http.get(environment.baseURL + `posts/employer-posts?page=${pageNo}`)
  }

  addPost(data:FormData):Observable<any> {
    return this._http.post(environment.baseURL + 'posts/employer-posts', data)
  }

  editPost(postData:FormData):Observable<any> {
    return this._http.put(environment.baseURL + 'posts/employer-posts', postData)
  }

  companyEditJobPost(jobId:string, jobData:FormData):Observable<any> {
    return this._http.put(environment.baseURL + 'employer/post', { jobId:jobId, jobData:jobData })
  }

  deletePost(post_id:string) {
    return this._http.delete(environment.baseURL + `posts/delete-post/${post_id}`,)
  }
  
}
