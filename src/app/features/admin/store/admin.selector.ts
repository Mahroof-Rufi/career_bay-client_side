import { createFeatureSelector, createSelector } from "@ngrx/store";
import { adminStateModel } from "./admin.model";

const getAdminState = createFeatureSelector<adminStateModel>('admin');

export const getUsersData = createSelector(getAdminState,
    (state: adminStateModel) => {
        return state.users
    }
);

export const getCompaniesData = createSelector(getAdminState,
    (state: adminStateModel) => {
        return state.companies
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