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
        url = `search=${query}`;
        break;
      case 'posts':
        url = `search?=${query}`;
        break;
      case 'users':
        url = `search?=${query}`;
        break;
      case 'companyJobs':
        url = `search=${query}`;
        break;
      case 'companyPosts':
        url = `search=${query}`;
        break;
    }
    return this.http.get(url);
  }
  
}
