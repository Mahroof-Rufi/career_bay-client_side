import { appStateModel } from './app.model';
import { createFeatureSelector, createSelector } from "@ngrx/store";

const getAppState = createFeatureSelector<appStateModel>('app');

export const getUserData = createSelector(getAppState,
    (state: appStateModel) => {
        return state.user
    }
);

export const getEmployerData = createSelector(getAppState,
    (state: appStateModel) => {
        return state.employer
    }
);