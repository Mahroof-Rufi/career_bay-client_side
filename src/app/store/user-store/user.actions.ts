import { createAction, props } from "@ngrx/store";
import { User } from "./user.model";
import { Job } from "../employer-store/employer.model";

export const loadUser = createAction("loadUser", props<{ userData: User }>());

export const loadJobs = createAction("loadJobs");
export const loadJobsSuccess = createAction("loadJobsSuccess", props<{ jobs:Job[] }>());