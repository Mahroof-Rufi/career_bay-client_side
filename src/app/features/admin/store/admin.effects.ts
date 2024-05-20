import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadUserSuccess, loadUsers } from "./admin.actions";
import { AuthService } from "../../../services/auth.service";
import { EMPTY, catchError, exhaustMap, map } from "rxjs";

@Injectable()
export class adminEffects {

    constructor(
        private actions:Actions,
        private apiService:AuthService
    ) { }

    loadUsers = createEffect(() => this.actions.pipe(
        ofType(loadUsers),
        exhaustMap(() => {
            return this.apiService.adminLoadUsers().pipe(
                map((data) => {
                    console.log(data);
                    return loadUserSuccess({ users:data })
                }),
                catchError((error) => {
                    console.error('HTTP Error on admin loaduser effect:',error);
                    return EMPTY
                })
            )
        })
    ))

}