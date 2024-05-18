import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { AuthService } from "../../services/auth.service"
import { EMPTY, catchError, exhaustMap, map } from "rxjs"
import { loadApplicants, loadApplicantsSucces, loadEmployer, loadEmployerJobs, loadEmployerJobsSuccess, loadEmployerSuccess, updateCandidateStatus } from "./employer.actions"

@Injectable()
export class employerEffects {

    constructor(
        private actions: Actions,
        private apiService: AuthService
    ) { }

    _loadEmployer = createEffect(() => this.actions.pipe(
        ofType(loadEmployer),        
        exhaustMap((action) => {            
            return this.apiService.fetchEmployerData().pipe(
                map((data) => { 
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
                }),
                catchError((error) => {
                    console.error('HTTP Error on loadEmployerJobs effect:', error);
                    return EMPTY;
                })
            )
        })
    ))

    loadJobApplication = createEffect(() => this.actions.pipe(
        ofType(loadApplicants),
        exhaustMap((action) => {
            return this.apiService.companyLoadJobApplicants(action.employer_id, action.jobId).pipe(
                map((data) => {
                    return loadApplicantsSucces({ applicants:data.appliedusers })
                }),
                catchError((error) => {
                    console.error('HTTP Error on loadEmployerApplicants effect:', error);
                    return EMPTY;
                })
            )
        })
    ))

    updateCandidateStatus = createEffect(() => this.actions.pipe(
        ofType(updateCandidateStatus),
        exhaustMap((action) => {
            return this.apiService.updateCandidateStatus(action.employer_id, action.job_id, action.user_id, action.newStatus).pipe(
                map((data) => {
                    return loadApplicantsSucces({ applicants:data.updatedData })
                }),
                catchError((error) => {
                    console.error('HTTP Error on updateCandidateStatus effect:', error);
                    return EMPTY;
                })
            )
        })
    ))
}