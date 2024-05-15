import { createReducer, on } from "@ngrx/store"
import { initialState } from "./user.store"
import { loadUserJobsSuccess, loadUserSuccess, updateUserAboutSuccess } from "./user.actions"

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
    })
)