import { createReducer, on } from "@ngrx/store"
import { initialState } from "./user.store"
import { loadUserJobsSuccess, loadUserSuccess } from "./user.actions"

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
    })
)