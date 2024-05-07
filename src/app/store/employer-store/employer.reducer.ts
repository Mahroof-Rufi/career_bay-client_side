import { createReducer, on } from "@ngrx/store"
import { loadEmployer } from "./employer.actions"
import { employerState } from "./employer.store"

export const employerReducer = createReducer(employerState,
    on(loadEmployer, (state,action) => {
        return {
            ...state,
            _id: action.employerData._id,
            companyName: action.employerData.companyName,
            noOfWorkersRange: action.employerData.noOfWorkersRange,
            profile_url: action.employerData.profile_url,
            email: action.employerData.email, 
            phone: action.employerData.phone,
            industry: action.employerData.industry,
            city: action.employerData.city,
            state: action.employerData.state,
            about: action.employerData.about,
            web_url: action.employerData.web_url,
            instagram_url: action.employerData.instagram_url,
            X_url: action.employerData.X_url
        }
    }),
)