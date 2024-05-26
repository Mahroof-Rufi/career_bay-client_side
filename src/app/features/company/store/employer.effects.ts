import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { EMPTY, catchError, exhaustMap, map } from "rxjs"
import { LOAD_EMPLOYER, LOAD_EMPLOYER_JOBS, loadApplicants, loadApplicantsSuccess, loadEmployer, loadEmployerJobs, loadEmployerJobsSuccess, loadEmployerPosts, loadEmployerPostsSuccess, loadEmployerSuccess, updateApplicantsStatus } from "./employer.actions"
import { EmployerApiServiceService } from "../services/employer-api-service.service"
import { JobsApiServiceService } from "../../../shared/services/jobs-api-service.service"
import { PostsApiServiceService } from "../../../shared/services/posts-api-service.service"
import { TuiAlertService } from "@taiga-ui/core"

@Injectable()
export class employerEffects {

    constructor(
        private readonly _actions: Actions,
        private readonly _alert:TuiAlertService,
        private readonly _employerAPIs: EmployerApiServiceService,
        private readonly _jobsAPIs: JobsApiServiceService,
        private readonly _postAPIs: PostsApiServiceService
    ) { }

    _loadEmployer = createEffect(() => this._actions.pipe(
        ofType(LOAD_EMPLOYER),        
        exhaustMap((action) => {            
            return this._employerAPIs.fetchEmployerData().pipe(
                map((data) => { 
                    return loadEmployerSuccess({ employer:data.employerData })
                }),
                catchError((error) => {
                    console.error('HTTP Error on loadEmploy effect:', error);
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

    _loadEmployerJobs = createEffect(() => this._actions.pipe(
        ofType(LOAD_EMPLOYER_JOBS),
        exhaustMap((action) => {
            return this._jobsAPIs.companyFetchJobs().pipe(
                map((data) => {
                    return loadEmployerJobsSuccess({jobs:data.jobs})
                }),
                catchError((error) => {
                    console.error('HTTP Error on loadEmployerJobs effect:', error);
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

    loadJobApplication = createEffect(() => this._actions.pipe(
        ofType(loadApplicants),
        exhaustMap((action) => {
            return this._jobsAPIs.companyLoadJobApplicants(action.employer_id, action.jobId).pipe(
                map((data) => {
                    return loadApplicantsSuccess({ applicants:data.appliedUsers })
                }),
                catchError((error) => {
                    console.error('HTTP Error on loadEmployerApplicants effect:', error);
                    return EMPTY;
                })
            )
        })
    ))

    updateCandidateStatus = createEffect(() => this._actions.pipe(
        ofType(updateApplicantsStatus),
        exhaustMap((action) => {
            return this._jobsAPIs.updateCandidateStatus(action.employer_id, action.job_id, action.user_id, action.newStatus).pipe(
                map((data) => {
                    return loadApplicantsSuccess({ applicants:data.updatedData })
                }),
                catchError((error) => {
                    console.error('HTTP Error on updateCandidateStatus effect:', error);
                    return EMPTY;
                })
            )
        })
    ))

    loadPosts = createEffect(() => this._actions.pipe(
        ofType(loadEmployerPosts),
        exhaustMap((action) => {
            return this._postAPIs.fetchPosts().pipe(
                map((data:any) => {
                    console.log(data);
                    
                    return loadEmployerPostsSuccess({ posts:data.posts })
                }),
                catchError((error) => {
                    console.error('HTTP Error on updateCandidateStatus effect:', error);
                    return EMPTY;
                })
            )
        })
    ))
}