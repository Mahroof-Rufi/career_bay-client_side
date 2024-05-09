import { createAction, props } from "@ngrx/store";
import { Employer, Job } from "./employer.model";

export const loadEmployer = createAction("employerUser", props<{ employerData: Employer }>());
export const loadJobs = createAction("loadJobs", props<{ jobs: Job[] }>())