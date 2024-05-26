import { userStateModel } from './user.model';
import { createFeatureSelector, createSelector } from "@ngrx/store";

const getUserState = createFeatureSelector<userStateModel>('user');

export const getUserData = createSelector(getUserState,
    (state: userStateModel) => {
        return state.user
    }
);

export const getUserId = createSelector(getUserState,
    (state: userStateModel) => {
        return state.user._id
    }
)

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
);

export const getExperienceById = (exp_id:string) => createSelector(getUserState,
    (state: userStateModel) => {
        return state.user.experiences?.find((exp) => exp._id == exp_id)
    }
)

export const getEducationById = (edctn_id:string) => createSelector(getUserState,
    (state: userStateModel) => {
        return state.user.educations?.find((edc) => edc._id == edctn_id)
    }
)

export const getUserSkills = createSelector(getUserState,
    (state: userStateModel) => {
        return state.user.skills
    }
)

export const getJobIsApplied = createSelector(getUserState,
    (state: userStateModel) => {
        return state.isApplied
    }
)

export const getAppliedJobs = createSelector(getUserState,
    (state: userStateModel) => {
        return state.AppliedJobs
    }
)

export const getPosts = createSelector(getUserState,
    (state: userStateModel) => {
        return state.posts
    }
)