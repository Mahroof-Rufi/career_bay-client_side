import { createReducer, on } from "@ngrx/store"
import { initialState } from "./user.store"
import { applyJobSuccess, deleteUserEducationSuccess, deleteUserExperienceSuccess, isAppliedSuccess, loadPostsSuccess, loadAppliedJobsSuccess, loadUserJobsSuccess, loadUserSuccess, updateUserProfileSuccess, updateUserAboutSuccess, isSavedSuccess, unSaveJobSuccess, saveJobSuccess, loadSavedJobsSuccess, loadUsersSuccess, loadEmployersSuccess, triggerPostSuccess } from "./user.actions"
import { Post } from "./user.model"

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
    on(loadPostsSuccess, (state, action) => {
        console.log('res post',action.posts);
        
        return {
            ...state,
            posts: action.posts
        }
    }),
    on(triggerPostSuccess, (state, action) => {
        const updatedPosts = state.posts.map((post:any) => post._id == action.updatedPost._id ? action.updatedPost : post)        
        return {
            ...state,
            posts: updatedPosts
        }
    }),
    on(updateUserProfileSuccess, (state,action) => {
        return {
            ...state,
            user: action.newData
        }
    }),
    on(updateUserAboutSuccess, (state, action) => {
        return {
            ...state,
            user: action.user
        }
    }),
    on(deleteUserExperienceSuccess, (state, action) => {
        return {
            ...state,
            user:action.user
        }
    }),
    on(deleteUserEducationSuccess, (state,action) => {
        return {
            ...state,
            user:action.user
        }
    }),
    on(applyJobSuccess, (state, action) => {
        return {
            ...state,
            isApplied: true
        }
    }),
    on(isAppliedSuccess, (state,action) => {
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
    on(saveJobSuccess, (state, action) => {
        return {
            ...state,
            isSaved:true
        }
    }),
    on(isSavedSuccess, (state, action) => {
        return {
            ...state,
            isSaved: action.isSaved
        }
    }),
    on(unSaveJobSuccess, (state,action) => {
        return {
            ...state,
            isSaved: false
        }
    }),
    on(loadSavedJobsSuccess, (state,action) => {
        return {
            ...state,
            savedJobs: action.savedJobs
        }
    }),
    on(loadUsersSuccess, (state,action) => {
        return {
            ...state,
            users: action.users
        }
    }),
    on(loadEmployersSuccess, (state, action) => {
        return {
            ...state,
            companies: action.employers
        }
    })
)


export const userFeatureKey = 'user'