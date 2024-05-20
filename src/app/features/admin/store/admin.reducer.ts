import { createReducer, on } from "@ngrx/store";
import { adminInitialStore } from "./admin.store";
import { loadUserSuccess } from "./admin.actions";

export const adminReducer = createReducer(adminInitialStore,
    on(loadUserSuccess, (state, action) => {
        return{
            ...state,
            users:action.users
        }
    })
)

export const adminFeatureKey = 'admin'