import { createAction, props } from "@ngrx/store";
import { Employer, User } from "./admin.model";

export const loadUsers = createAction("loadUsers")
export const loadUserSuccess = createAction("loadUsersSuccess", props<{ users:User[] }>())

export const userAction = createAction("userAction", props<{ user_id:string }>())
export const userActionSuccess = createAction("userActionSuccess", props<{ user:User }>())

export const loadCompanies = createAction("loadCompanies")
export const loadCompaniesSuccess = createAction("loadCompaniesSuccess", props<{ companies:Employer[] }>())

export const companyAction = createAction("employerAction", props<{ emplyr_id:string }>())
export const companyActionSuccess = createAction("employerActionSuccess", props<{ employer:Employer }>())