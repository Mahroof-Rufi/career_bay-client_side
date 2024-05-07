import { createReducer, on } from "@ngrx/store"
import { initialState } from "./app.store"
import { loadEmployer, loadUser } from "./app.actions"

export const appReducer = createReducer(initialState,
    on(loadUser, (state,action) => {
        return {
            ...state,
            user: action.userData
        }
    }),
    on(loadEmployer, (state,action) => {
        return {
            ...state,
            employer: action.employerData
        }
    })
)