import { createFeatureSelector, createSelector } from "@ngrx/store";
import { adminStateModel } from "./admin.model";

const getAdminState = createFeatureSelector<adminStateModel>('admin');

export const getUsersData = createSelector(getAdminState,
    (state: adminStateModel) => {
        return {
            users:state.users,
            totalUsersCount:state.totalUsersCount
        }
    }
);

export const getCompaniesData = createSelector(getAdminState,
    (state: adminStateModel) => {
        return {
            employers:state.companies,
            totalEmployersCount:state.totalCompaniesCount
        }
    }
);

export const getJobsData = createSelector(getAdminState,
    (state: adminStateModel) => {
        return {
            jobs:state.jobs,
            totalJobsCount:state.totalJobsCount
        }
    }
);

export const getUserById = (user_id:string) => createSelector(getAdminState,
    (state: adminStateModel) => {
        return state.users.find( user => user._id == user_id)
    }
) 

export const getEmployerById = (employer_id:string) => createSelector(getAdminState,
    (state: adminStateModel) => {
        return state.companies.find( company => company._id == employer_id )
    }
)