import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Employer } from "./employer.model";

const getEmployerState = createFeatureSelector<Employer>('employer');

export const getEmployerData = createSelector(getEmployerState,
    (state: Employer) => {
        return state
    }
);