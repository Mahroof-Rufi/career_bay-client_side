import { createReducer, on } from "@ngrx/store"
import { loadEmployer, loadJobs } from "./employer.actions"
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
    })
)
