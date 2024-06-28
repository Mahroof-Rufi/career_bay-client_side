import { filter } from 'rxjs/operators';
import { createAction, props } from "@ngrx/store";
import { AppliedJobs, EditUser, Post, Posts, User, education, experience } from "./user.model";
import { Employer, Job } from "../../company/store/employer.model";


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

export const SAVE_JOB = '[jobs] save job post';
export const SAVE_JOB_SUCCESS = '[jobs] save job post success';

export const UNSAVE_JOB = '[jobs] unsave job post';
export const UNSAVE_JOB_SUCCESS = '[jobs] unsave job post success';

export const LOAD_SAVED_POSTS = '[posts] load saved posts';
export const LOAD_SAVED_POSTS_SUCCESS = '[posts] load saved posts success';

export const LOAD_SAVED_JOBS = '[jobs] load saved jobs';
export const LOAD_SAVED_JOBS_SUCCESS = '[jobs] load saved jobs success';

export const IS_SAVED = '[jobs] is job saved';
export const IS_SAVED_SUCCESS = '[jobs] is job saved success';

export const IS_APPLIED = '[user] is applied';
export const IS_APPLIED_SUCCESS = '[user] is applied success';

export const LOAD_USER_APPLIED_JOBS = '[user] load user applied jobs';
export const LOAD_USER_APPLIED_JOBS_SUCCESS = '[user] load user applied jobs success';

export const LOAD_POSTS = '[posts] load posts';
export const LOAD_POSTS_SUCCESS = '[posts] load posts success';

export const TRIGGER_POST_LIKE = '[posts] trigger post like';
export const TRIGGER_POST_SAVE = '[posts] trigger post save';
export const TRIGGER_POST_SUCCESS = '[posts] trigger post like success';

export const LOAD_USERS = '[users] load users';
export const LOAD_USERS_SUCCESS = '[users] load users success';

export const LOAD_EMPLOYERS_SUCCESS = '[employers] load employers success'




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

export const applyJob = createAction(APPLY_JOB, props<{ formData:FormData }>());
export const applyJobSuccess = createAction(APPLY_JOB_SUCCESS, props<{ updatedAppliedJobs:AppliedJobs }>());

export const saveJob = createAction(SAVE_JOB, props<{ job_id:string }>());
export const saveJobSuccess = createAction(SAVE_JOB_SUCCESS)

export const unSaveJob = createAction(UNSAVE_JOB, props<{ job_id:string }>()); 
export const unSaveJobSuccess = createAction(UNSAVE_JOB_SUCCESS);

export const loadSavedJobs = createAction(LOAD_SAVED_JOBS)
export const loadSavedJobsSuccess = createAction(LOAD_SAVED_JOBS_SUCCESS, props<{ savedJobs:Job[] }>())

export const loadSavedPosts = createAction(LOAD_SAVED_POSTS)
export const loadSavedPostsSuccess = createAction(LOAD_SAVED_POSTS_SUCCESS, props<{ savedPosts:Post[] }>())

export const isSaved = createAction(IS_SAVED, props<{ jobId:string }>())
export const isSavedSuccess = createAction(IS_SAVED_SUCCESS, props<{ isSaved:boolean }>())

export const isApplied = createAction(IS_APPLIED, props<{ jobId:string }>());
export const isAppliedSuccess = createAction(IS_APPLIED_SUCCESS, props<{ isVerified:boolean }>());

export const loadAppliedJobs = createAction(LOAD_USER_APPLIED_JOBS);
export const loadAppliedJobsSuccess = createAction(LOAD_USER_APPLIED_JOBS_SUCCESS, props<{ appliedJobs:AppliedJobs[] }>())

export const loadPosts = createAction(LOAD_POSTS);
export const loadPostsSuccess = createAction(LOAD_POSTS_SUCCESS, props<{ posts:Posts[] }>())

export const triggerPostLike = createAction(TRIGGER_POST_LIKE, props<{ employer_id:string, post_id:string }>())
export const triggerPostSave = createAction(TRIGGER_POST_SAVE, props<{ employer_id:string, post_id:string }>())
export const triggerPostSuccess = createAction(TRIGGER_POST_SUCCESS, props<{ updatedPost:Post }>())

export const loadUsers = createAction(LOAD_USERS, props<{ pageNo:number, filterQuery:string }>())
export const loadUsersSuccess = createAction(LOAD_USERS_SUCCESS, props<{ users:User[], totalNoOfUsers:number }>());

export const loadEmployersSuccess = createAction(LOAD_EMPLOYERS_SUCCESS, props<{ employers:Employer[] }>())