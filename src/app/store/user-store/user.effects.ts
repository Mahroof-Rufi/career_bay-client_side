import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from "@angular/core";
import { loadUserJobs, loadUserJobsSuccess, loadUser, loadUserSuccess, updateUserAbout, updateUserAboutSuccess, addUserExperience, editUserEducation, updateUserSkills, applyJob, applyJobSucces, isApplied, isAppliedSucces, loadAppliedJobs, loadAppliedJobsSuccess, loadPosts, laodPostsSucces, deleteUserExperience, deleteUserExperienceSucces, deleteUserEducation, deleteUserEducationSucces } from './user.actions';
import { EMPTY, catchError, exhaustMap, map } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class userEffects {

    constructor(
        private actions: Actions,
        private apiService: AuthService,
    ) { }

    _jobs = createEffect(() => this.actions.pipe(
        ofType(loadUserJobs),
        exhaustMap((action) => {
            return this.apiService.userFetchALLJobs().pipe(
                map((data) => {  
                    console.log('here the data', data);
                    console.log(data);
                    
                    
                    return loadUserJobsSuccess({jobs:data.data})
                }),
                catchError((error) => {
                    console.error('HTTP Error on loadsueerJobs effect:', error);
                    return EMPTY;
                })
            )
        })
    ))

    _user = createEffect(() => this.actions.pipe(
        ofType(loadUser),
        exhaustMap((action) => {
            return this.apiService.fetchUserdata().pipe(
                map((data) => {
                    return loadUserSuccess({ user: data.userData })
                }),
                catchError((error) => {
                    console.error('HTTP Error on loaduserffect:', error);
                    return EMPTY;
                })
            )
        })
    ))

    updateUserProfile = createEffect(() => this.actions.pipe(
        ofType(updateUserAbout),
        exhaustMap((action) => {
            return this.apiService.userUpdateProfile(action.newData, action.userId).pipe(
                map((data:any) => {
                    return updateUserAboutSuccess({ newData:data.updatedData })
                }),
                catchError((error) => {
                    console.error('HTTP Error on updateUserProfile effect:', error);
                    return EMPTY;
                })
            )
        })
    ))

    addUserExperience = createEffect(() => this.actions.pipe(
        ofType(addUserExperience),
        exhaustMap((action) => {
            return this.apiService.userUpdateExperience(action.experience, action.userId, action.exp_id ).pipe(
                map((data:any) => {
                    return updateUserAboutSuccess({ newData:data.updatdData })
                }),
                catchError((error) => {
                    console.error('HTTP Error on addUserExperienve effect:', error);
                    return EMPTY;
                })
            )
        })
    ))

    edituserEducation = createEffect(() => this.actions.pipe(
        ofType(editUserEducation),
        exhaustMap((action) => {            
            return this.apiService.userEditEducation(action.education, action.userId, action.edcn_id).pipe(
                map((data:any) => {
                    console.log(data);
                    
                    return updateUserAboutSuccess({ newData:data.updatdData })
                }),
                catchError((error) => {
                    console.error('HTTP Error on edit user education effect:', error);
                    return EMPTY;
                })
            )
        })
    ))

    editUserSkills = createEffect(() => this.actions.pipe(
        ofType(updateUserSkills),
        exhaustMap((action) => {
            return this.apiService.userUpdateSkills(action.skills, action.user_id).pipe(
                map((data:any) => {
                    return updateUserAboutSuccess({ newData:data.updatdData })
                }),
                catchError((error) => {
                    console.error('HTTP Error on edit user skills effect:', error);
                    return EMPTY;
                })
            )
        })
    ))

    applyJob = createEffect(() => this.actions.pipe(
        ofType(applyJob),
        exhaustMap((action) => {
            return this.apiService.userApplyJob(action.user_id, action.job_id).pipe(
                map((data:any) => {
                    return applyJobSucces()
                }),
                catchError((error) => {
                    console.error('HTTP Error on applyJob effect:', error);
                    return EMPTY;
                })                
            )
        })
    ))

    isjobApplied = createEffect(() => this.actions.pipe(
        ofType(isApplied),
        exhaustMap((action) => {
            return this.apiService.userVerifyApplication(action.userId, action.jobId).pipe(
                map((data:any) => {
                    console.log(data);
                    console.log(data.isApplied);
                    
                    
                    return isAppliedSucces({ isVerified:data.isApplied })
                }),
                catchError((error) => {
                    console.error('HTTP Error on is applie effect:', error);
                    return EMPTY;
                }) 
            )
        })
    ))

    loadAppliedJobs = createEffect(() => this.actions.pipe(
        ofType(loadAppliedJobs),
        exhaustMap((action) => {
            console.log('api call started');
            
            return this.apiService.userLoadAppliedJobs(action.user_id).pipe(
                map((data:any) => {
                    console.log(data.appliedJobs);
                    return loadAppliedJobsSuccess({ appliedJobs:data.appliedJobs })
                }),
                catchError((error) => {
                    console.error('HTTP Error on loadAppliedJobs effect:', error);
                    return EMPTY;
                })
            )
        })
    ))

    loadPosts = createEffect(() => this.actions.pipe(
        ofType(loadPosts),
        exhaustMap((action) => {
            return this.apiService.loadPosts().pipe(
                map((data:any) => {
                    console.log(data)
                    return laodPostsSucces({ posts:data.posts })                    
                }),
                catchError((error) => {
                    console.error('HTTP Error on loadPosts effect:', error);
                    return EMPTY;
                })
            )
        })
    ))

    deleteUserExperience = createEffect(() => this.actions.pipe(
        ofType(deleteUserExperience),
        exhaustMap((action) => {            
            return this.apiService.deleteUserExperience(action.exp_id).pipe(
                map((data:any) => {
                    return deleteUserExperienceSucces({ user:data.updatedData })
                }),
                catchError((error) => {
                    console.error('HTTP Error on delete user exp effect:', error);
                    return EMPTY;
                })
            )
        })
    ))

    deleteUserEducation = createEffect(() => this.actions.pipe(
        ofType(deleteUserEducation),
        exhaustMap((action) => {
            return this.apiService.deleteUserEducation(action.edu_id).pipe(
                map((data:any) => {
                    return deleteUserEducationSucces({ user:data.updatedData })
                }),
                catchError((error) => {
                    console.error('HTTP Error on delete user edu effect:', error);
                    return EMPTY;
                })
            )
        })
    ))
}