import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from "@angular/core";
import { loadUserJobs, loadUserJobsSuccess, loadUser, loadUserSuccess } from './user.actions';
import { EMPTY, catchError, exhaustMap, map } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class userEffects {

    constructor(
        private actions: Actions,
        private apiService: AuthService
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
                catchError(() => EMPTY)
            )
        })
    ))
}