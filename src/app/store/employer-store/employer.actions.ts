import { createAction, props } from "@ngrx/store";
import { Employer, Job } from "./employer.model";

export const loadEmployer = createAction("loadEmployer");
export const loadEmployerSuccess = createAction("loadEmployerSuccess", props<{ employer:Employer }>())

export const loadEmployerJobs = createAction("loadJobs")
export const loadEmployerJobsSuccess = createAction("loadEmployerJobsSuccess",props<{ jobs:Job[] }>())

export const addJobPost = createAction("addJob", props<{ job:Job }>())

export const updateJob = createAction('[Jobs] updateJob', props<{ id: string, updatedJob: Job }>());

export const deleteJob = createAction('[Jobs] deleteJob', props<{ id: string }>())