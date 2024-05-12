import { userStateModel } from './user.model';
import { createFeatureSelector, createSelector } from "@ngrx/store";

const getUserState = createFeatureSelector<userStateModel>('user');

export const getUserData = createSelector(getUserState,
    (state: userStateModel) => {
        return state.user
    }
);

export const getJobsData = createSelector(getUserState,
    (state: userStateModel) => {
        return state.jobs
    }
)  
