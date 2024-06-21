import { createReducer, on } from "@ngrx/store";
import { adminInitialStore } from "./admin.store";
import { employerActionSuccess, jobActionSuccess, loadEmployersSuccess, loadJobsSuccess, loadUserSuccess, userActionSuccess } from "./admin.actions";
import { User } from "./admin.model";

export const adminReducer = createReducer(adminInitialStore,    
    on(loadUserSuccess, (state, action) => {
        return{
            ...state,
            users:action.users,
            totalUsersCount: action.totalUsersCount
        }
    }),
    on(userActionSuccess, (state, action) => {
        const updatedUserData = state.users.map( user => user._id === action.user._id ? action.user : user)
        return {
            ...state,
            users: updatedUserData
        }
    }),
    on(loadEmployersSuccess, (state, action) => {
        return {
            ...state,
            companies: action.employers,
            totalCompaniesCount: action.totalEmployersCount
        }
    }),
    on(employerActionSuccess, (state, action) => {
        const updatedEmployers = state.companies.map( emplyr => emplyr._id === action.employer._id ? action.employer : emplyr )
        return {
            ...state,
            companies:updatedEmployers
        }
    }),
    on(loadJobsSuccess, (state, action) => {
        return {
            ...state,
            jobs: action.jobs,
            totalJobsCount: action.totalJobsCount
        }
    }),
    on(jobActionSuccess, (state, action) => {
        const updatedJobs = state.jobs.map( job => job._id === action.job._id ? action.job : job)
        return {
            ...state,
            jobs:updatedJobs
        }
    }),
)

export const adminFeatureKey = 'admin'