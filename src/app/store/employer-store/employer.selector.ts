import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EmployerState } from "./employer.store";
import { Job } from "./employer.model";

const getEmployerState = createFeatureSelector<EmployerState>('employer');

export const getEmployerData = createSelector(getEmployerState,
    (state: EmployerState) => {
        return state.employer
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