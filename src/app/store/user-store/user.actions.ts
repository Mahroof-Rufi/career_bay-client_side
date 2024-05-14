import { createAction, props } from "@ngrx/store";
import { User } from "./user.model";
import { Job } from "../employer-store/employer.model";

export const loadUser = createAction("loadUser");
export const loadUserSuccess = createAction("loadUserSuccess", props<{ user:User }>())

export const loadUserJobs = createAction("loadJobs");
export const loadUserJobsSuccess = createAction("loadJobsSuccess", props<{ jobs:Job[] }>());