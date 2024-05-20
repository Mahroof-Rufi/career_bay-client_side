import { experience, education, Posts } from './../store/user-store/user.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { EditUser } from '../store/user-store/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  userRequestOTP(email:string) {
    return this.http.post('http://localhost:3000/send-otp',{ email:email })
  }

  userRegistration(formData:FormGroup):Observable<any> {
    return this.http.post('http://localhost:3000/sign_up', formData)
  }

  userLogin(loginData: FormGroup):Observable<any> {
    return this.http.post('http://localhost:3000/login', loginData)
  }

  userGoogleRegistration(userData: any):Observable<any> {
    return this.http.post('http://localhost:3000/g-auth', userData)
  }

  userForgorPasswordRequestOTP(email:string) {
    return this.http.post('http://localhost:3000/forgot-password', {email:email})
  }

  userUpdateProfile(newData:EditUser | FormData, userID:string) {
    return this.http.patch(`http://localhost:3000/${userID}`, newData )
  }

  userUpdateExperience(experience:experience, user_id:string, exp_id?:string) {
    return this.http.patch(`http://localhost:3000/update-experience/${user_id}`, { exp:experience, exp_id:exp_id })
  }

  userEditEducation(education:education, user_id:string, edcn_id?:string) {
    return this.http.patch(`http://localhost:3000/update-education/${user_id}`, { edctn:education, edcn_id:edcn_id })
  }

  userUpdateSkills(skills:string[], user_id:string) {
    return this.http.patch(`http://localhost:3000/update-skills/${user_id}`, { skills:skills })
  }

  userResetPassword(data:FormGroup):Observable<any> {
    return this.http.patch('http://localhost:3000/forgot-password', data)
  }

  userFetchALLJobs():Observable<any> {
    return this.http.get('http://localhost:3000/jobs')
  }

  fetchUserdata():Observable<any> {
    return this.http.get('http://localhost:3000/user')
  }

  userApplyJob(user_id:string, job_id:string):Observable<any> {
    return this.http.patch(`http://localhost:3000/apply-job/${user_id}`, {jobId:job_id})
  }

  userVerifyApplication(user_id:string, job_id:string):Observable<any> {
    return this.http.post(`http://localhost:3000/verify-application/${user_id}`, {job_id:job_id})
  }

  userLoadAppliedJobs(user_id:string):Observable<any> {
    return this.http.get(`http://localhost:3000/apply-job/${user_id}`)
  }

  loadPosts():Observable<any> {
    return this.http.get('http://localhost:3000/posts')
  }
 
  changeEmailSendOTP(currentEmail:string):Observable<any> {
    return this.http.post('http://localhost:3000/changeEmail', { currentEmail:currentEmail })
  }

  userUpdateEmail(data:any):Observable<any> {
    return this.http.patch('http://localhost:3000/changeEmail', data)
  }




  companyRequestOTP(email:string):Observable<any> {
    return this.http.post('http://localhost:3000/employer/send-otp', { email:email })
  }

  companyRegistration(companyData:FormGroup):Observable<any> {
    return this.http.post('http://localhost:3000/employer/register', companyData)
  }

  companyLogin(loginData:FormGroup):Observable<any> {
    return this.http.post('http://localhost:3000/employer/login', loginData)
  }

  companyForgorPasswordRequestOTP(email:string) {
    return this.http.post('http://localhost:3000/employer/forgot-password', {email:email})
  }

  companyResetPassword(data:FormGroup):Observable<any> {
    return this.http.patch('http://localhost:3000/employer/forgot-password', data)
  }

  companyUpdateProfile(profileData:FormData):Observable<any> {
    return this.http.put('http://localhost:3000/employer/update-profile', profileData)
  }

  companyFetchJobs(title?:string):Observable<any> {
    let param = new HttpParams()
    if (title) {
      param = param.append('title', title)
    }
    return this.http.get('http://localhost:3000/employer/job', { params: param });
  }

  companyAddJobPost(jobData:FormData):Observable<any> {
    return this.http.post('http://localhost:3000/employer/job', jobData)
  }

  companyEditJobPost(jobId:string, jobData:FormData):Observable<any> {
    return this.http.put(`http://localhost:3000/employer/job/${jobId}`, jobData)
  }

  companyDeleteJob(jobId:string):Observable<any> {
    return this.http.delete(`http://localhost:3000/employer/job/${jobId}`)
  }

  fetchEmployerData():Observable<any> {
    return this.http.get('http://localhost:3000/employer/')
  }

  companyLoadJobApplicants(employerId:string,job_id:string):Observable<any> {
    return this.http.post(`http://localhost:3000/employer/applicants/${employerId}`, {job_id:job_id})
  }

  updateCandidateStatus(employer_id:string,job_id:string,user_id:string,newStatus:string):Observable<any> {
    return this.http.patch(`http://localhost:3000/employer/applicants/${employer_id}`, { job_id:job_id, user_id:user_id, newStatus:newStatus })
  }
  
  fetchPosts() {
    return this.http.get('http://localhost:3000/employer/post')
  }

  addPost(data:FormData):Observable<any> {
    return this.http.post('http://localhost:3000/employer/post', data)
  }
  
  

  adminLogin(loginData:FormGroup):Observable<any> {
    return this.http.post('http://localhost:3000/admin/login', loginData)
  }

  adminLoadUsers():Observable<any> {
    return this.http.get('http://localhost:3000/admin/users')
  }

  adminUserAction(user_id:string):Observable<any> {
    return this.http.patch('http://localhost:3000/admin/users', { user_id:user_id })
  }
  
  adminLoadCompanies():Observable<any> {
    return this.http.get('http://localhost:3000/admin/companies')
  }

  adminEmployerAction(emplr_id:string):Observable<any> {
    return this.http.patch('http://localhost:3000/admin/companies', { employer_id:emplr_id })
  }
}
