import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { AuthService } from "../../services/auth.service"
import { EMPTY, catchError, exhaustMap, map } from "rxjs"
import { loadEmployer, loadEmployerJobs, loadEmployerJobsSuccess, loadEmployerSuccess } from "./employer.actions"

@Injectable()
export class employerEffects {

    constructor(
        private actions: Actions,
        private apiService: AuthService
    ) { }

    _loadEmployer = createEffect(() => this.actions.pipe(
        ofType(loadEmployer),        
        exhaustMap((action) => {
            console.log('first effects');
            
            return this.apiService.fetchEmployerData().pipe(
                map((data) => { 
                    console.log('here succe 1');
                    console.log(data);
                    return loadEmployerSuccess({ employer:data.data })
                }),
                catchError((error) => {
                    console.error('HTTP Error on loadEmploye effect:', error);
                    return EMPTY;
                })
            )
        })
    ))

    _loadEmployerJobs = createEffect(() => this.actions.pipe(
        ofType(loadEmployerJobs),
        exhaustMap((action) => {
            return this.apiService.companyFetchJobs().pipe(
                map((data) => {
                    return loadEmployerJobsSuccess({jobs:data.jobs})
                })
            )
        })
    ))
}