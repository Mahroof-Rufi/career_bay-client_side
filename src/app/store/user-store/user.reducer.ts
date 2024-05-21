import { createReducer, on } from "@ngrx/store"
import { initialState } from "./user.store"
import { applyJobSucces, deleteUserEducationSucces, deleteUserExperienceSucces, isAppliedSucces, laodPostsSucces, loadAppliedJobsSuccess, loadUserJobsSuccess, loadUserSuccess, updateUserAboutSuccess } from "./user.actions"

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
        return {
            ...state,
            isApplied: true
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
    }),
    on(deleteUserExperienceSucces, (state, action) => {
        return {
            ...state,
            user:action.user
        }
    }),
    on(deleteUserEducationSucces, (state,action) => {
        return {
            ...state,
            user:action.user
        }
    })
)