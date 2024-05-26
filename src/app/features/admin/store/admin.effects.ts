import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { companyAction, companyActionSuccess, loadCompanies, loadCompaniesSuccess, loadUserSuccess, loadUsers, userAction, userActionSuccess } from "./admin.actions";
import { EMPTY, catchError, exhaustMap, map } from "rxjs";
import { AdminApiServiceService } from "../services/admin-api-service.service";
import { UserAPIServiceService } from "../../user/services/user-api-service.service";
import { EmployerApiServiceService } from "../../company/services/employer-api-service.service";

@Injectable()
export class adminEffects {

    constructor(
        private readonly _actions:Actions,
        private readonly _adminAPIs:AdminApiServiceService,
        private readonly _userAPIs:UserAPIServiceService,
        private readonly _employerAPIs:EmployerApiServiceService,
    ) { }

    loadUsers = createEffect(() => this._actions.pipe(        
        ofType(loadUsers),
        exhaustMap(() => {
            return this._adminAPIs.adminLoadUsers().pipe(
                map((data) => {
                    return loadUserSuccess({ users:data })
                }),
                catchError((error) => {
                    console.error('HTTP Error on admin loadUser effect:',error);
                    return EMPTY
                })
            )
        })
    ))

    userAction = createEffect(() => this._actions.pipe(
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

    loadCompanies = createEffect(() => this._actions.pipe(
        ofType(loadCompanies),
        exhaustMap((action) => {
            return this._adminAPIs.adminLoadCompanies().pipe(
                map((data) => {
                    return loadCompaniesSuccess({ companies:data.data })
                }),
                catchError((error) => {
                    console.error('HTTP Error on admin load companies effect:',error);
                    return EMPTY
                })
            )
        })
    ))

    companyActionSuccess = createEffect(() => this._actions.pipe(
        ofType(companyAction),
        exhaustMap((action) => {
            return this._adminAPIs.adminEmployerAction(action.employer_id).pipe(
                map((data) => {
                    console.log(data);
                    
                    return companyActionSuccess({ employer:data.updatedEmployer })
                }),
                catchError((error) => {
                    console.error('HTTP Error on admin company action effect:',error);
                    return EMPTY
                })
            )
        })
    ))

}