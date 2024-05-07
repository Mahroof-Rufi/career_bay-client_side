import { createAction, props } from "@ngrx/store";
import { Employer } from "./employer.model";

export const loadEmployer = createAction("employerUser", props<{ employerData: Employer }>());