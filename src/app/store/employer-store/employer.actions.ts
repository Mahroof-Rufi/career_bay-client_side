import { createAction, props } from "@ngrx/store";
import { AppliedUsers, Employer, EmployerPosts, Job, Post } from "./employer.model";

export const loadEmployer = createAction("loadEmployer");
export const updateEmployer = createAction("updateEmployer", props<{ newData:Employer }>())
export const loadEmployerSuccess = createAction("loadEmployerSuccess", props<{ employer:Employer }>())

export const loadEmployerJobs = createAction("loadJobs")
export const loadEmployerJobsSuccess = createAction("loadEmployerJobsSuccess",props<{ jobs:Job[] }>())

export const addJobPost = createAction("addJob", props<{ job:Job }>())

export const updateJob = createAction('[Jobs] updateJob', props<{ id: string, updatedJob: Job }>());

export const deleteJob = createAction('[Jobs] deleteJob', props<{ id: string }>())

export const loadApplicants = createAction("loadApplicants", props<{ jobId:string, employer_id:string }>())
export const loadApplicantsSucces = createAction("loadApplicantsSucces", props<{ applicants:AppliedUsers }>())

export const updateCandidateStatus= createAction("updateCandidateStatus", props<{ job_id:string, user_id:string, newStatus:string, employer_id:string }>())

export const loadEmployerPosts = createAction("loadEmployerPosts")
export const loadEmployerPostsSucces = createAction("loadEmployerPostsSucces", props<{ posts:EmployerPosts[] }>())