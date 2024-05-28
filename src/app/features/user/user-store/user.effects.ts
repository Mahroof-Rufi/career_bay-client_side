import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from "@angular/core";
import { loadUserJobs, loadUserJobsSuccess, loadUser, loadUserSuccess, updateUserProfile, updateUserProfileSuccess, updateUserExperience, editUserEducation, updateUserSkills, applyJob, applyJobSuccess, isApplied, isAppliedSuccess, loadAppliedJobs, loadAppliedJobsSuccess, loadPosts, loadPostsSuccess, deleteUserExperience, deleteUserExperienceSuccess, deleteUserEducation, deleteUserEducationSuccess, LOAD_USER, LOAD_JOBS, LOAD_POSTS, UPDATE_USER_ABOUT, updateUserAbout, updateUserAboutSuccess, saveJob, saveJobSuccess, isSaved, isSavedSuccess, unSaveJob, unSaveJobSuccess, loadSavedJobs, loadSavedJobsSuccess, LOAD_SAVED_JOBS } from './user.actions';
import { EMPTY, catchError, exhaustMap, map } from 'rxjs';
import { UserAPIServiceService } from '../services/user-api-service.service';
import { JobsApiServiceService } from '../../../shared/services/jobs-api-service.service';
import { PostsApiServiceService } from '../../../shared/services/posts-api-service.service';
import { TuiAlertService } from '@taiga-ui/core';
import { Router } from '@angular/router';

@Injectable()
export class userEffects {

    constructor(
        private readonly _actions: Actions,
        private readonly _alert: TuiAlertService,
        private readonly _router:Router,
        private readonly _userAPIs:UserAPIServiceService,
        private readonly _jobsAPIs:JobsApiServiceService,
        private readonly _postsAPIs:PostsApiServiceService
    ) { }

    _loadUser = createEffect(() => this._actions.pipe(
        ofType(LOAD_USER),
        exhaustMap((action) => {
            return this._userAPIs.fetchUserData().pipe(
                map((data) => {
                    return loadUserSuccess({ user: data.userData })
                }),
                catchError((error) => {
                    console.error('HTTP Error on loadUserEffect:', error);
                    if (error.status == 403) {
                        this._router.navigateByUrl('/home')
                    }
                    this._alert.open('', {
                        label: error.error.message,
                        status: 'error',
                        autoClose: false,
                        hasCloseButton: true
                    }).subscribe()
                    return EMPTY;
                })
            )
        })
    ))

    _loadJobs = createEffect(() => this._actions.pipe(
        ofType(LOAD_JOBS),
        exhaustMap((action) => {
            return this._jobsAPIs.userFetchALLJobs().pipe(
                map((data) => {
                    return loadUserJobsSuccess({jobs:data.data})
                }),
                catchError((error) => {
                    console.error('HTTP Error on loadUserJobs effect:', error);
                    if (error.status == 403) {
                        this._router.navigateByUrl('/home')
                    }
                    this._alert.open('', {
                        label: error.error.message,
                        status: 'error',
                        autoClose: false,
                        hasCloseButton: true
                    }).subscribe()
                    return EMPTY;
                })
            )
        })
    ))

    _loadPosts = createEffect(() => this._actions.pipe(
        ofType(LOAD_POSTS),
        exhaustMap((action) => {
            return this._postsAPIs.loadPosts().pipe(
                map((data:any) => {
                    return loadPostsSuccess({ posts:data.posts })                    
                }),
                catchError((error) => {
                    console.error('HTTP Error on loadPosts effect:', error);
                    if (error.status == 403) {
                        this._router.navigateByUrl('/home')
                    }
                    this._alert.open('', {
                        label: error.error.message,
                        status: 'error',
                        autoClose: false,
                        hasCloseButton: true
                    }).subscribe()
                    return EMPTY;
                })
            )
        })
    ))

    _updateUserProfile = createEffect(() => this._actions.pipe(
        ofType(updateUserProfile),
        exhaustMap((action) => {
            return this._userAPIs.userUpdateProfile(action.newData).pipe(
                map((data:any) => {
                    return updateUserProfileSuccess({ newData:data.updatedData })
                }),
                catchError((error) => {
                    console.error('HTTP Error on updateUserProfile effect:', error);
                    if (error.status == 403) {
                        this._router.navigateByUrl('/home')
                    }
                    this._alert.open('', {
                        label: error.error.message,
                        status: 'error',
                        autoClose: false,
                        hasCloseButton: true
                    }).subscribe()
                    return EMPTY;
                })
            )
        })
    ))

    _updateUserAbout = createEffect(() => this._actions.pipe(
        ofType(updateUserAbout),
        exhaustMap((action) => {
            return this._userAPIs.userUpdateAbout(action.newAbout).pipe(
                map((data:any) => {
                    return updateUserAboutSuccess({ user:data.updatedData })
                }),
                catchError((error) => {
                    console.error('HTTP Error on updateUserProfile effect:', error);
                    if (error.status == 403) {
                        this._router.navigateByUrl('/home')
                    }
                    this._alert.open('', {
                        label: error.error.message,
                        status: 'error',
                        autoClose: false,
                        hasCloseButton: true
                    }).subscribe()
                    return EMPTY;
                })
            )
        })
    ))

    _updateUserExperience = createEffect(() => this._actions.pipe(
        ofType(updateUserExperience),
        exhaustMap((action) => {
            return this._userAPIs.userUpdateExperience(action.experience, action.exp_id ).pipe(
                map((data:any) => {
                    return updateUserProfileSuccess({ newData:data.updatedData })
                }),
                catchError((error) => {
                    console.error('HTTP Error on addUserExperience effect:', error);
                    if (error.status == 403) {
                        this._router.navigateByUrl('/home')
                    }
                    this._alert.open('', {
                        label: error.error.message,
                        status: 'error',
                        autoClose: false,
                        hasCloseButton: true
                    }).subscribe()
                    return EMPTY;
                })
            )
        })
    ))

    _deleteUserExperience = createEffect(() => this._actions.pipe(
        ofType(deleteUserExperience),
        exhaustMap((action) => {            
            return this._userAPIs.deleteUserExperience(action.exp_id).pipe(
                map((data:any) => {
                    this._alert.open('', {
                        label: 'Delete successful',
                        status: 'success',
                        autoClose: true,
                        hasCloseButton: true
                    }).subscribe()
                    return deleteUserExperienceSuccess({ user:data.updatedData })
                }),
                catchError((error) => {
                    if (error.status == 403) {
                        this._router.navigateByUrl('/home')
                    }
                    this._alert.open('', {
                        label: error.error.message,
                        status: 'error',
                        autoClose: false,
                        hasCloseButton: true
                    }).subscribe()
                    console.error('HTTP Error on delete user exp effect:', error);
                    return EMPTY;
                })
            )
        })
    ))

    _updateUserEducation = createEffect(() => this._actions.pipe(
        ofType(editUserEducation),
        exhaustMap((action) => {            
            return this._userAPIs.userEditEducation(action.education, action.education_id).pipe(
                map((data:any) => {
                    this._alert.open('', {
                        label: 'User education updated successfully',
                        status: 'success',
                        autoClose: true,
                        hasCloseButton: true
                    }).subscribe()
                    return updateUserProfileSuccess({ newData:data.updatedData })
                }),
                catchError((error) => {
                    console.error('HTTP Error on edit user education effect:', error);
                    if (error.status == 403) {
                        this._router.navigateByUrl('/home')
                    }
                    this._alert.open('', {
                        label: error.error.message,
                        status: 'error',
                        autoClose: false,
                        hasCloseButton: true
                    }).subscribe()
                    return EMPTY;
                })
            )
        })
    ))

    _deleteUserEducation = createEffect(() => this._actions.pipe(
        ofType(deleteUserEducation),
        exhaustMap((action) => {
            return this._userAPIs.deleteUserEducation(action.edu_id).pipe(
                map((data:any) => {
                    this._alert.open('', {
                        label: 'Delete education successful',
                        status: 'success',
                        autoClose: false,
                        hasCloseButton: true
                    }).subscribe()
                    return deleteUserEducationSuccess({ user:data.updatedData })
                }),
                catchError((error) => {
                    if (error.status == 403) {
                        this._router.navigateByUrl('/home')
                    }
                    this._alert.open('', {
                        label: error.error.message,
                        status: 'error',
                        autoClose: false,
                        hasCloseButton: true
                    }).subscribe()
                    console.error('HTTP Error on delete user edu effect:', error);
                    return EMPTY;
                })
            )
        })
    ))

    _editUserSkills = createEffect(() => this._actions.pipe(
        ofType(updateUserSkills),
        exhaustMap((action) => {
            return this._userAPIs.userUpdateSkills(action.skills).pipe(
                map((data:any) => {
                    this._alert.open('', {
                        label: 'User skills updated successful',
                        status: 'success',
                        autoClose: true,
                        hasCloseButton: true
                    }).subscribe()
                    return updateUserProfileSuccess({ newData:data.updatedData })
                }),
                catchError((error) => {
                    console.error('HTTP Error on edit user skills effect:', error);
                    if (error.status == 403) {
                        this._router.navigateByUrl('/home')
                    }
                    this._alert.open('', {
                        label: error.error.message,
                        status: 'error',
                        autoClose: false,
                        hasCloseButton: true
                    }).subscribe()
                    return EMPTY;
                })
            )
        })
    ))

    _isJobApplied = createEffect(() => this._actions.pipe(
        ofType(isApplied),
        exhaustMap((action) => {
            return this._jobsAPIs.userVerifyApplication(action.jobId).pipe(
                map((data:any) => {
                    return isAppliedSuccess({ isVerified:data.isApplied })
                }),
                catchError((error) => {
                    console.error('HTTP Error on is applied effect:', error);
                    if (error.status == 403) {
                        this._router.navigateByUrl('/home')
                    }
                    this._alert.open('', {
                        label: error.error.message,
                        status: 'error',
                        autoClose: true,
                        hasCloseButton: true
                    }).subscribe()
                    return EMPTY;
                }) 
            )
        })
    ))

    _applyJob = createEffect(() => this._actions.pipe(
        ofType(applyJob),
        exhaustMap((action) => {
            return this._jobsAPIs.userApplyJob(action.job_id).pipe(
                map((data:any) => {
                    this._alert.open('', {
                        label: 'Job application send successfully',
                        status: 'success',
                        autoClose: true,
                        hasCloseButton: true
                    }).subscribe()
                    return applyJobSuccess({ updatedAppliedJobs:data.updatedAppliedJobs })
                }),
                catchError((error) => {
                    console.error('HTTP Error on applyJob effect:', error);
                    if (error.status == 403) {
                        this._router.navigateByUrl('/home')
                    }
                    this._alert.open('', {
                        label: error.error.message,
                        status: 'error',
                        autoClose: false,
                        hasCloseButton: true
                    }).subscribe()
                    return EMPTY;
                })                
            )
        })
    ))

    _loadAppliedJobs = createEffect(() => this._actions.pipe(
        ofType(loadAppliedJobs),
        exhaustMap((action) => {
            return this._jobsAPIs.userLoadAppliedJobs().pipe(
                map((data:any) => {
                    return loadAppliedJobsSuccess({ appliedJobs:data.appliedJobs })
                }),
                catchError((error) => {
                    console.error('HTTP Error on loadAppliedJobs effect:', error);
                    if (error.status == 403) {
                        this._router.navigateByUrl('/home')
                    }
                    this._alert.open('', {
                        label: error.error.message,
                        status: 'error',
                        autoClose: false,
                        hasCloseButton: true
                    }).subscribe()
                    return EMPTY;
                })
            )
        })
    ))

    _saveJobPost = createEffect(() => this._actions.pipe(
        ofType(saveJob),
        exhaustMap((action) => {
            return this._jobsAPIs.userSaveJob(action.job_id).pipe(
                map((data:any) => {
                    this._alert.open('', {
                        label: 'Job post saved successfully',
                        status: 'success',
                        autoClose: false,
                        hasCloseButton: true
                    }).subscribe()
                    return saveJobSuccess()
                }),
                catchError((error) => {
                    console.error('HTTP Error on loadAppliedJobs effect:', error);
                    if (error.status == 403) {
                        this._router.navigateByUrl('/home')
                    }
                    this._alert.open('', {
                        label: error.error.message,
                        status: 'error',
                        autoClose: false,
                        hasCloseButton: true
                    }).subscribe()
                    return EMPTY;
                })
            )
        })
    ))

    _isSaved = createEffect(() => this._actions.pipe(
        ofType(isSaved),
        exhaustMap((action) => {
            return this._jobsAPIs.userIsJobSaved(action.jobId).pipe(
                map((data:any) => {
                    return isSavedSuccess({ isSaved:data.isSaved })
                }),
                catchError((error) => {
                    console.error('HTTP Error on loadAppliedJobs effect:', error);
                    if (error.status == 403) {
                        this._router.navigateByUrl('/home')
                    }
                    return EMPTY;
                })
            )
        })
    ))

    _unSaveJob = createEffect(() => this._actions.pipe(
        ofType(unSaveJob),
        exhaustMap((action) => {
            return this._jobsAPIs.userUnSaveJob(action.job_id).pipe(
                map((data:any) => {
                    this._alert.open('', {
                        label: 'Job post unsaved successfully',
                        status: 'success',
                        autoClose: false,
                        hasCloseButton: true
                    }).subscribe()
                    return unSaveJobSuccess()
                }),
                catchError((error) => {
                    console.error('HTTP Error on loadAppliedJobs effect:', error);
                    if (error.status == 403) {
                        this._router.navigateByUrl('/home')
                    }
                    this._alert.open('', {
                        label: error.error.message,
                        status: 'error',
                        autoClose: false,
                        hasCloseButton: true
                    }).subscribe()
                    return EMPTY;
                })
            )
        })
    ))

    _loadSavedJobs = createEffect(() => this._actions.pipe(
        ofType(LOAD_SAVED_JOBS),
        exhaustMap((action) => {
            return this._jobsAPIs.userLoadSavedJobs().pipe(
                map((data:any) => {
                    console.log('llll',data.jobs);
                    
                    return loadSavedJobsSuccess({ savedJobs:data.jobs })
                }),
                catchError((error) => {
                    console.error('HTTP Error on loadAppliedJobs effect:', error);
                    if (error.status == 403) {
                        this._router.navigateByUrl('/home')
                    }
                    this._alert.open('', {
                        label: error.error.message,
                        status: 'error',
                        autoClose: false,
                        hasCloseButton: true
                    }).subscribe()
                    return EMPTY;
                })
            )
        })
    ))
}