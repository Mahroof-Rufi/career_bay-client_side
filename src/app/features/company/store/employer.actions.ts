import { createAction, props } from "@ngrx/store";
import { AppliedUsers, Employer, EmployerPosts, Job, Post } from "./employer.model";


export const LOAD_EMPLOYER = '[employer] load employer';
export const LOAD_EMPLOYER_SUCCESS = '[employer] load employer success';

export const UPDATE_EMPLOYER = '[employer] update employer';

export const LOAD_EMPLOYER_JOBS = '[jobs] load employer jobs';
export const LOAD_EMPLOYER_JOBS_SUCCESS = '[jobs] load employer jobs success';

export const ADD_EMPLOYER_JOB = '[jobs] add employer job';

export const UPDATE_EMPLOYER_JOB = '[jobs] update employer job';

export const DELETE_EMPLOYER_JOB = '[jobs] delete employer job';

export const LOAD_EMPLOYER_JOB_APPLICANTS = '[job applicants] load employer job applicants';
export const LOAD_EMPLOYER_JOB_APPLICANTS_SUCCESS = '[job applicants] load employer job applicants';

export const UPDATE_EMPLOYER_JOB_APPLICANTS = '[job applicants] update employer job applicant status';

export const REJECT_EMPLOYER_JOB_APPLICANTS = '[job applicants] reject employer job application';

export const LOAD_EMPLOYER_POSTS = '[posts] load employer posts';
export const LOAD_EMPLOYER_POSTS_SUCCESS = '[posts] load employer posts success';

export const ADD_EMPLOYER_POSTS = '[posts] add employer posts';

export const CLOSE_HIRING = '[jobs] employer close hiring';
export const CLOSE_HIRING_SUCCESS = '[jobs] employer close hiring success';

export const DELETE_POST_SUCCESS = '[posts] delete post success';


export const loadEmployer = createAction(LOAD_EMPLOYER);
export const loadEmployerSuccess = createAction(LOAD_EMPLOYER_SUCCESS, props<{ employer:Employer }>())

export const updateEmployer = createAction(UPDATE_EMPLOYER, props<{ newData:Employer }>())

export const loadEmployerJobs = createAction(LOAD_EMPLOYER_JOBS)
export const loadEmployerJobsSuccess = createAction(LOAD_EMPLOYER_JOBS_SUCCESS,props<{ jobs:Job[] }>())

export const addJobPost = createAction(ADD_EMPLOYER_JOB, props<{ job:Job }>())

export const updateJob = createAction(UPDATE_EMPLOYER_JOB, props<{ id: string, updatedJob: Job }>());

export const deleteJob = createAction(DELETE_EMPLOYER_JOB, props<{ id: string }>())

export const loadApplicants = createAction(LOAD_EMPLOYER_JOB_APPLICANTS, props<{ jobId:string }>())
export const loadApplicantsSuccess = createAction(LOAD_EMPLOYER_JOB_APPLICANTS_SUCCESS, props<{ applicants:AppliedUsers }>())

export const updateApplicationStatus = createAction(UPDATE_EMPLOYER_JOB_APPLICANTS, props<{ job_id:string, user_id:string, newStatus:string, employer_id:string }>())

export const rejectApplication = createAction(REJECT_EMPLOYER_JOB_APPLICANTS, props<{ job_id:string, user_id:string }>())

export const loadEmployerPosts = createAction(LOAD_EMPLOYER_POSTS)
export const loadEmployerPostsSuccess = createAction(LOAD_EMPLOYER_POSTS_SUCCESS, props<{ posts:EmployerPosts[] }>())

export const addPostSuccess = createAction(ADD_EMPLOYER_POSTS, props<{ posts:EmployerPosts[] }>())

export const closeHiring = createAction(CLOSE_HIRING, props<{ job_id:string }>())
export const closeHiringSuccess = createAction(CLOSE_HIRING_SUCCESS, props<{ job_id:string }>())

export const deletePostSuccess = createAction(DELETE_POST_SUCCESS, props<{ post_id:string }>())