import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from "@angular/core";
import { loadUserJobs, loadUserJobsSuccess, loadUser, loadUserSuccess, updateUserAbout, updateUserAboutSuccess, addUserExperience } from './user.actions';
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
                    console.log('updated experience');
                    console.log(data);
                    console.log(data.updatedData);
                    
                    return updateUserAboutSuccess({ newData:data.updatdData })
                }),
                catchError((error) => {
                    console.error('HTTP Error on addUserExperienve effect:', error);
                    return EMPTY;
                })
            )
        })
    ))
}