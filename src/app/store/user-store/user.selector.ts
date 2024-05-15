import { userStateModel } from './user.model';
import { createFeatureSelector, createSelector } from "@ngrx/store";

const getUserState = createFeatureSelector<userStateModel>('user');

export const getUserData = createSelector(getUserState,
    (state: userStateModel) => {
        return state.user
    }
);

export const getUserAbout = createSelector(getUserState,
    (state: userStateModel) => {
        return {
            about:state.user.about,
            userID:state.user._id
        }
    }
)

export const getJobsData = createSelector(getUserState,
    (state: userStateModel) => {
        return state.jobs
    }
);

export const getJobById = (jobId:string) => createSelector(getUserState,
    (state: userStateModel) => {
        return state.jobs.find((job) => job._id == jobId)
    }
)