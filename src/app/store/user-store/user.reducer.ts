import { createReducer, on } from "@ngrx/store"
import { initialState } from "./user.store"
import { applyJobSucces, isAppliedSucces, laodPostsSucces, loadAppliedJobsSuccess, loadUserJobsSuccess, loadUserSuccess, updateUserAboutSuccess } from "./user.actions"

export const userReducer = createReducer(initialState,
    on(loadUserSuccess, (state,action) => {
        return {
            ...state,
            user: action.user
        }
    }),
    on(loadUserJobsSuccess, (state, action) => {
        return {
            ...state,
            jobs:action.jobs
        }
    }),
    on(updateUserAboutSuccess, (state,action) => {
        return {
            ...state,
            user: action.newData
        }
    }),
    on(applyJobSucces, (state, action) => {
        const updatedJobs = state.jobs.map(job =>
            job._id === action.updatedJob._id ? action.updatedJob : job
          );
        return {
            ...state,
            user: action.updatedUser,
            jobs: updatedJobs
        }
    }),
    on(isAppliedSucces, (state,action) => {
        return {
            ...state,
            isApplied: action.isVerified
        }
    }),
    on(loadAppliedJobsSuccess, (state, action) => {
        return {
            ...state,
            AppliedJobs: action.appliedJobs
        }
    }),
    on(laodPostsSucces, (state, action) => {
        return {
            ...state,
            posts: action.posts
        }
    })
)