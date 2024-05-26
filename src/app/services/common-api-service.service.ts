import { experience, education, Posts } from '../features/user/user-store/user.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class commonAPIService {

  constructor(private http:HttpClient) { }

  Search(query: string, searchType: 'jobs' | 'posts' | 'users' | 'companyJobs' | 'companyPosts'): Observable<any> {
    let url = '';
    switch (searchType) {
      case 'jobs':
        url = `${environment.baseURL}jobs?search=${query}`;
        break;
      case 'posts':
        url = `${environment.baseURL}posts?search?=${query}`;
        break;
      case 'users':
        url = `${environment.baseURL}users?search?=${query}`;
        break;
      case 'companyJobs':
        url = `${environment.baseURL}employer/job?search=${query}`;
        break;
      case 'companyPosts':
        url = `${environment.baseURL}employer/post?search=${query}`;
        break;
    }
    return this.http.get(url);
  }
  
}
