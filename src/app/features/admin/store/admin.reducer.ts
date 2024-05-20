import { createReducer, on } from "@ngrx/store";
import { adminInitialStore } from "./admin.store";
import { companyActionSuccess, loadCompaniesSuccess, loadUserSuccess, userActionSuccess } from "./admin.actions";
import { User } from "./admin.model";

export const adminReducer = createReducer(adminInitialStore,    
    on(loadUserSuccess, (state, action) => {
        return{
            ...state,
            users:action.users
        }
    }),
    on(userActionSuccess, (state, action) => {
        const updatedUserData = state.users.map( user => user._id === action.user._id ? action.user : user)
        return {
            ...state,
            users: updatedUserData
        }
    }),
    on(loadCompaniesSuccess, (state, action) => {
        return {
            ...state,
            companies: action.companies
        }
    }),
    on(companyActionSuccess, (state, action) => {
        const updatedEmployers = state.companies.map( emplyr => emplyr._id === action.employer._id ? action.employer : emplyr )
        return {
            ...state,
            companies:updatedEmployers
        }
    })
)

export const adminFeatureKey = 'admin'