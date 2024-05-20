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