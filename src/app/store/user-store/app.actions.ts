import { createAction, props } from "@ngrx/store";
import { Employer, User } from "./app.model";

export const loadUser = createAction("loadUser", props<{ userData: User }>());
export const loadEmployer = createAction("loadEmployer", props<{ employerData: Employer }>());