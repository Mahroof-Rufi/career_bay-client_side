import { createAction, props } from "@ngrx/store";
import { AppliedJobs, EditUser, Posts, User, education, experience } from "./user.model";
import { Job } from "../../company/store/employer.model";


export const LOAD_USER = '[user] load user';
export const LOAD_USER_SUCCESS = '[user] load user success';

export const LOAD_JOBS = '[jobs] load jobs';
export const LOAD_JOBS_SUCCESS = '[jobs] load jobs success';

export const UPDATE_USER_PROFILE = '[user] update user profile';
export const UPDATE_USER_PROFILE_SUCCESS = '[user] update user profile success'

export const UPDATE_USER_ABOUT = '[user] update user about'
export const UPDATE_USER_ABOUT_SUCCESS = '[user] update user about success'

export const UPDATE_USER_EXPERIENCE = '[user] add user experience';

export const DELETE_USER_EXPERIENCE = '[user] delete user experience';
export const DELETE_USER_EXPERIENCE_SUCCESS = '[user] delete user experience success';

export const UPDATE_USER_EDUCATION = '[user] add user education';

export const DELETE_USER_EDUCATION = '[user] delete user education';
export const DELETE_USER_EDUCATION_SUCCESS = '[user] delete user education success';

export const UPDATE_USER_SKILLS = '[user] update user skills';

export const APPLY_JOB = '[user] apply for job';
export const APPLY_JOB_SUCCESS = '[user] apply job success';

export const IS_APPLIED = '[user] is applied';
export const IS_APPLIED_SUCCESS = '[user] is applied success';

export const LOAD_USER_APPLIED_JOBS = '[user] load user applied jobs';
export const LOAD_USER_APPLIED_JOBS_SUCCESS = '[user] load user applied jobs success';

export const LOAD_POSTS = '[posts] load posts';
export const LOAD_POSTS_SUCCESS = '[posts] load posts success';




export const loadUser = createAction(LOAD_USER);
export const loadUserSuccess = createAction(LOAD_USER_SUCCESS, props<{ user:User }>())

export const loadUserJobs = createAction(LOAD_JOBS);
export const loadUserJobsSuccess = createAction(LOAD_JOBS_SUCCESS, props<{ jobs:Job[] }>());

export const updateUserProfile = createAction(UPDATE_USER_PROFILE, props<{ newData:EditUser | FormData }>());
export const updateUserProfileSuccess = createAction(UPDATE_USER_PROFILE_SUCCESS, props<{ newData:User }>());

export const updateUserAbout = createAction(UPDATE_USER_ABOUT, props<{ newAbout:string }>());
export const updateUserAboutSuccess = createAction(UPDATE_USER_ABOUT_SUCCESS, props<{ user:User }>());

export const updateUserExperience = createAction(UPDATE_USER_EXPERIENCE, props<{ experience:experience, exp_id?:string }>());

export const deleteUserExperience = createAction(DELETE_USER_EXPERIENCE, props<{ exp_id:string }>());
export const deleteUserExperienceSuccess = createAction(DELETE_USER_EXPERIENCE_SUCCESS, props<{ user:User }>());

export const editUserEducation = createAction(UPDATE_USER_EDUCATION, props<{ education:education, education_id?:string }>());

export const deleteUserEducation = createAction(DELETE_USER_EDUCATION, props<{ edu_id:string }>());
export const deleteUserEducationSuccess = createAction(DELETE_USER_EDUCATION_SUCCESS, props<{ user:User }>());

export const updateUserSkills = createAction(UPDATE_USER_SKILLS, props<{ skills:string[] }>());

export const applyJob = createAction(APPLY_JOB, props<{ job_id:string }>());
export const applyJobSuccess = createAction(APPLY_JOB_SUCCESS, props<{ updatedAppliedJobs:AppliedJobs }>());

export const isApplied = createAction(IS_APPLIED, props<{ jobId:string }>());
export const isAppliedSuccess = createAction(IS_APPLIED_SUCCESS, props<{ isVerified:boolean }>());

export const loadAppliedJobs = createAction(LOAD_USER_APPLIED_JOBS);
export const loadAppliedJobsSuccess = createAction(LOAD_USER_APPLIED_JOBS_SUCCESS, props<{ appliedJobs:AppliedJobs[] }>())

export const loadPosts = createAction(LOAD_POSTS);
export const loadPostsSuccess = createAction(LOAD_POSTS_SUCCESS, props<{ posts:Posts[] }>())