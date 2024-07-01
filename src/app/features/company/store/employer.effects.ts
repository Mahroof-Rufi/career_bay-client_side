import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { EMPTY, catchError, exhaustMap, map } from "rxjs"
import { LOAD_EMPLOYER, LOAD_EMPLOYER_JOBS, LOAD_EMPLOYER_POSTS, closeHiring, closeHiringSuccess, loadApplicants, loadApplicantsSuccess, loadEmployer, loadEmployerJobs, loadEmployerJobsSuccess, loadEmployerPosts, loadEmployerPostsSuccess, loadEmployerSuccess, rejectApplication, updateApplicationStatus } from "./employer.actions"
import { EmployerApiServiceService } from "../services/employer-api-service.service"
import { JobsApiServiceService } from "../../../shared/services/jobs-api-service.service"
import { PostsApiServiceService } from "../../../shared/services/posts-api-service.service"
import { TuiAlertService } from "@taiga-ui/core"
import { Router } from "@angular/router"

@Injectable()
export class employerEffects {

    constructor(
        private readonly _actions: Actions,
        private readonly _alert:TuiAlertService,
        private readonly _router:Router,
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

    // _loadEmployerJobs = createEffect(() => this._actions.pipe(
    //     ofType(LOAD_EMPLOYER_JOBS),
    //     exhaustMap((action) => {
    //         return this._jobsAPIs.companyFetchJobs().pipe(
    //             map((data) => {
    //                 return loadEmployerJobsSuccess({jobs:data.jobs})
    //             }),
    //             catchError((error) => {
    //                 this._alert.open('', {
    //                     label: error.error.message,
    //                     status: 'error',
    //                     autoClose: true,
    //                     hasCloseButton: true
    //                 }).subscribe()
    //                 return EMPTY;
    //             })
    //         )
    //     })
    // ))

    // _loadPosts = createEffect(() => this._actions.pipe(
    //     ofType(LOAD_EMPLOYER_POSTS),
    //     exhaustMap((action) => {
    //         return this._postAPIs.fetchPosts().pipe(
    //             map((data:any) => {
    //                 return loadEmployerPostsSuccess({ posts:data.posts })
    //             }),
    //             catchError((error) => {
    //                 this._alert.open('', {
    //                     label: error.error.message,
    //                     status: 'error',
    //                     autoClose: true,
    //                     hasCloseButton: true
    //                 }).subscribe()
    //                 return EMPTY;
    //             })
    //         )
    //     })
    // ))

    _loadJobApplications = createEffect(() => this._actions.pipe(
        ofType(loadApplicants),
        exhaustMap((action) => {
            return this._jobsAPIs.companyLoadJobApplicants(action.jobId).pipe(
                map((data) => {
                    return loadApplicantsSuccess({ applicants:data.appliedUsers })
                }),
                catchError((error) => {
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

    _updateCandidateStatus = createEffect(() => this._actions.pipe(
        ofType(updateApplicationStatus),
        exhaustMap((action) => {
            return this._jobsAPIs.updateCandidateStatus(action.job_id, action.user_id, action.newStatus).pipe(
                map((data) => {
                    return loadApplicantsSuccess({ applicants:data.updatedData })
                }),
                catchError((error) => {
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

    _rejectCandidate = createEffect(() => this._actions.pipe(
        ofType(rejectApplication),
        exhaustMap((action) => {
            return this._jobsAPIs.rejectCandidateApplication(action.job_id, action.user_id).pipe(
                map((data:any) => {
                    this._alert.open('', {
                        label: 'Application rejected successfully',
                        status: 'success',
                        autoClose: true,
                        hasCloseButton: true
                    }).subscribe()
                    return loadApplicantsSuccess({ applicants:data })
                }),
                catchError((error) => {
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

    _closeHiring = createEffect(() => this._actions.pipe(
        ofType(closeHiring),
        exhaustMap((action) => {
            return this._jobsAPIs.closeHiring(action.job_id).pipe(
                map((data:any) => {
                    this._alert.open('', {
                        label: 'Close hiring successfully',
                        status: 'success',
                        autoClose: true,
                        hasCloseButton: true
                    }).subscribe()
                    return closeHiringSuccess({ job_id:action.job_id })
                }),
                catchError((error) => {
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
}