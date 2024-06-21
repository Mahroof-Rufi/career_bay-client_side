import { createAction, props } from "@ngrx/store";
import { Employer, User } from "./admin.model";
import { Job } from "../../company/store/employer.model";


export const LOAD_USERS = '[admin users] load users';
export const LOAD_USERS_SUCCESS = '[admin users] load users success';

export const USER_ACTION = '[admin users] user action';
export const USER_ACTION_SUCCESS = '[admin users] user action success';

export const LOAD_EMPLOYERS = '[admin employers] load employers';
export const LOAD_EMPLOYERS_SUCCESS = '[admin employers] load employers success';

export const EMPLOYER_ACTION = '[admin employer] employer action';
export const EMPLOYER_ACTION_SUCCESS = '[admin employer] employer action success';

export const LOAD_JOBS = '[admin jobs] load jobs';
export const LOAD_JOBS_SUCCESS = '[admin jobs] load jobs success';

export const JOB_ACTION = '[admin jobs] job action';
export const JOB_ACTION_SUCCESS = '[admin jobs] job action success';



export const loadUsers = createAction(LOAD_USERS, props<{ pageNo:number,queries?:any }>())
export const loadUserSuccess = createAction(LOAD_USERS_SUCCESS, props<{ users:User[], totalUsersCount:number }>())

export const userAction = createAction(USER_ACTION, props<{ user_id:string }>())
export const userActionSuccess = createAction(USER_ACTION_SUCCESS, props<{ user:User }>())

export const loadEmployers = createAction(LOAD_EMPLOYERS, props<{ pageNo:number, queries?:any }>())
export const loadEmployersSuccess = createAction(LOAD_EMPLOYERS_SUCCESS, props<{ employers:Employer[], totalEmployersCount:number }>())

export const employerAction = createAction(EMPLOYER_ACTION, props<{ employer_id:string }>())
export const employerActionSuccess = createAction(EMPLOYER_ACTION_SUCCESS, props<{ employer:Employer }>())

export const loadJobs = createAction(LOAD_JOBS, props<{ pageNo:number, queries?:any }>())
export const loadJobsSuccess = createAction(LOAD_JOBS_SUCCESS, props<{ jobs:Job[], totalJobsCount:number }>())

export const jobAction = createAction(JOB_ACTION, props<{ job_id:string }>())
export const jobActionSuccess = createAction(JOB_ACTION_SUCCESS, props<{ job:Job }>())