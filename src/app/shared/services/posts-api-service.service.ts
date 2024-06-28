import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

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

  triggerPostLike(employer_id:string, post_id:string) {
    return this._http.post(environment.baseURL + 'posts', { employer_id:employer_id, post_id:post_id })
  }

  addComment(comment:string,employer_id:string,post_Id:string) {
    return this._http.post(environment.baseURL + 'posts/add-comment', {comment, employer_id, post_Id})
  }

  fetchPosts(pageNo:number, sortAndSearchQueries?:string ) {    
    return this._http.get(environment.baseURL + `posts/employer-posts?page=${pageNo}&${sortAndSearchQueries}`)
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
    return this._http.delete(environment.baseURL + `posts/delete-post/${post_id}`)
  }
  
}
