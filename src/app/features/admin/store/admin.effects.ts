import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LOAD_USERS, employerAction, employerActionSuccess, jobAction, jobActionSuccess, loadEmployers, loadEmployersSuccess, loadJobs, loadJobsSuccess, loadUserSuccess, loadUsers, userAction, userActionSuccess } from "./admin.actions";
import { EMPTY, catchError, exhaustMap, map } from "rxjs";
import { AdminApiServiceService } from "../services/admin-api-service.service";
import { UserAPIServiceService } from "../../user/services/user-api-service.service";
import { EmployerApiServiceService } from "../../company/services/employer-api-service.service";
import { TuiAlertService } from "@taiga-ui/core";

@Injectable()
export class adminEffects {

    constructor(
        private readonly _actions:Actions,
        private readonly _alert:TuiAlertService,
        private readonly _adminAPIs:AdminApiServiceService,
        private readonly _userAPIs:UserAPIServiceService,
        private readonly _employerAPIs:EmployerApiServiceService,
    ) { }

    _loadUsers = createEffect(() => this._actions.pipe(        
        ofType(loadUsers),
        exhaustMap((action) => {
            return this._adminAPIs.adminLoadUsers(action.pageNo, action.queries).pipe(
                map((data) => {
                    return loadUserSuccess({ users:data.users, totalUsersCount:data.totalUsersCount })
                }),
                catchError((error) => {
                    console.error('HTTP Error on admin loadUser effect:',error);
                    this._alert.open('', {
                        label: error.error.message,
                        status: 'error',
                        autoClose: true,
                        hasCloseButton: true
                    }).subscribe()
                    return EMPTY
                })
            )
        })
    ))

    _userAction = createEffect(() => this._actions.pipe(
        ofType(userAction),
        exhaustMap((action) => {
            return this._adminAPIs.adminUserAction(action.user_id).pipe(
                map((data) => {                 
                    return userActionSuccess({ user:data.updatedUser })
                }),
                catchError((error) => {
                    console.error('HTTP Error on admin userAction effect:',error);
                    return EMPTY
                })
            )
        })
    ))

    _loadCompanies = createEffect(() => this._actions.pipe(
        ofType(loadEmployers),
        exhaustMap((action) => {
            return this._adminAPIs.adminLoadCompanies(action.pageNo, action.queries).pipe(
                map((data) => {
                    return loadEmployersSuccess({ employers:data.employers, totalEmployersCount:data.totalUsersCount })
                }),
                catchError((error) => {
                    console.error('HTTP Error on admin load companies effect:',error);
                    return EMPTY
                })
            )
        })
    ))

    _employerAction = createEffect(() => this._actions.pipe(
        ofType(employerAction),
        exhaustMap((action) => {
            return this._adminAPIs.adminEmployerAction(action.employer_id).pipe(
                map((data) => {
                    return employerActionSuccess({ employer:data.updatedEmployer })
                }),
                catchError((error) => {
                    console.error('HTTP Error on admin company action effect:',error);
                    return EMPTY
                })
            )
        })
    ))

    _loadJobs = createEffect(() => this._actions.pipe(
        ofType(loadJobs),
        exhaustMap((action) => {
            return this._adminAPIs.loadJobs(action.pageNo, action.queries).pipe(
                map((data) => {
                    return loadJobsSuccess({ jobs:data.jobs, totalJobsCount:data.totalJobsCount })
                }),
                catchError((error) => {
                    console.error('HTTP Error on admin load companies effect:',error);
                    return EMPTY
                })
            )
        })
    ))

    _jobAction = createEffect(() => this._actions.pipe(
        ofType(jobAction),
        exhaustMap((action) => {
            return this._adminAPIs.jobAction(action.job_id).pipe(
                map((response) => {
                    console.log(response);
                    
                    return jobActionSuccess({ job:response.updatedJob })
                }),
                catchError((error) => {
                    console.error('HTTP Error on admin company action effect:',error);
                    return EMPTY
                })
            )
        })
    ))

}