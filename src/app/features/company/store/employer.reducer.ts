import { createReducer, on } from "@ngrx/store"
import { addJobPost, addPostSuccess, deleteJob, loadApplicantsSuccess, loadEmployerJobsSuccess, loadEmployerPostsSuccess, loadEmployerSuccess, updateEmployer, updateJob } from "./employer.actions"
import { initialState } from "./employer.store"

export const employerReducer = createReducer(initialState,
    on(loadEmployerSuccess, (state,action) => {
        return {
            ...state,
            employer: action.employer
        }
    }),
    on(loadEmployerJobsSuccess, (state, action) => {
        return {
            ...state,
            jobs: action.jobs
        }
    }),
    on(updateEmployer, (state, action) => {
        return {
            ...state,
            employer: action.newData
        }
    }),
    on(addJobPost, (state,action) => {
        return {
            ...state,
            jobs: [...state.jobs, action.job]
        }
    }),
    on(updateJob, (state, action) => {
        return {
            ...state,
            jobs: state.jobs.map(job => job._id === action.id ? { ...job, ...action.updatedJob } : job)
        }
    }),
    on(deleteJob, (state, action) => {
        return {
            ...state,
            jobs: state.jobs.filter(job => job._id !== action.id)
        }
    }),
    on(loadApplicantsSuccess, (state, action) => {
        return {
            ...state,
            applicants: action.applicants
        }
    }),
    on(loadEmployerPostsSuccess, (state, action) => {
        console.log('red',action.posts);
        return {
            ...state,
            posts: action.posts
        }
    }),
    on(addPostSuccess, (state, action) => {
        console.log('red',action.posts);
        
        return {
            ...state,
            posts:action.posts
        }
    })
)