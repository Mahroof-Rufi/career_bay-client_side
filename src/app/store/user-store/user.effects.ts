import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from "@angular/core";
import { loadJobs, loadJobsSuccess } from './user.actions';
import { EMPTY, catchError, exhaustMap, map } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class userEffects {

    constructor(
        private actions: Actions,
        private apiService: AuthService
    ) { }

    _jobs = createEffect(() => this.actions.pipe(
        ofType(loadJobs),
        exhaustMap((action) => {
            return this.apiService.userFetchALLJobs().pipe(
                map((data) => {  
                    return loadJobsSuccess({jobs:data.data})
                }),
                catchError(() => EMPTY)
            )
        })
    ))
}