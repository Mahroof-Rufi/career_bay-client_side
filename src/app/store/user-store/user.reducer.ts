import { createReducer, on } from "@ngrx/store"
import { initialState } from "./user.store"
import { loadJobsSuccess, loadUser } from "./user.actions"

export const userReducer = createReducer(initialState,
    on(loadUser, (state,action) => {
        return {
            ...state,
            user: action.userData
        }
    }),
    on(loadJobsSuccess, (state, action) => {
        return {
            ...state,
            jobs:action.jobs
        }
    })
)