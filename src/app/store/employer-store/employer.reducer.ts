import { createReducer, on } from "@ngrx/store"
import { addJobPost, deleteJob, loadEmployerJobsSuccess, loadEmployerSuccess, updateEmployer, updateJob } from "./employer.actions"
import { initialState } from "./employer.store"

export const employerReducer = createReducer(initialState,
    on(loadEmployerSuccess, (state,action) => {
        return {
            ...state,
            employer: action.employer
        }
    }),
    on(updateEmployer, (state, action) => {
        return {
            ...state,
            employer: action.newData
        }
    }),
    on(loadEmployerJobsSuccess, (state, action) => {
        return {
            ...state,
            jobs: action.jobs
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
    })
)
