import { createReducer, on } from "@ngrx/store"
import { loadEmployer, loadJobs, updateJob } from "./employer.actions"
import { initialState } from "./employer.store"

export const employerReducer = createReducer(initialState,
    on(loadEmployer, (state,action) => {
        return {
            ...state,
            employer: action.employerData
        }
    }),
    on(loadJobs, (state,action) => {
        return {
            ...state,
            jobs: action.jobs
        }
    }),
    on(updateJob, (state, action) => {
        return {
            ...state,
            jobs: state.jobs.map(job => job._id === action.id ? { ...job, ...action.updatedJob } : job)
        }
    })
)
