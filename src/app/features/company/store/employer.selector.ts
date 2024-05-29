import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EmployerState } from "./employer.store";
import { EmployerPosts, Job, Post } from "./employer.model";

const getEmployerState = createFeatureSelector<EmployerState>('employer');

export const getEmployerData = createSelector(getEmployerState,
    (state: EmployerState) => {
        return state.employer
    }
);

export const getEmployerId = createSelector(getEmployerState,
    (state: EmployerState) => {
        return state.employer._id
    }
);

export const getJobsData = createSelector(getEmployerState,
    (state: EmployerState) => {
        return state.jobs
    }
)

export const getJobById = (jobId:string) => createSelector(getEmployerState,
    (state: EmployerState) => {
        return state.jobs.find((job:Job) => job._id === jobId)
    }
)

export const getApplicants = createSelector(getEmployerState,
    (state: EmployerState) => {
        return state.applicants
    }
)

export const getPosts = createSelector(getEmployerState,
    (state: EmployerState) => {
        return state.posts
    }
)

export const getPostById = (post_id:string) => createSelector(getEmployerState,
    (state: EmployerState) => {
        return state.posts.find((post:any) => post._id === post_id)
    }
)