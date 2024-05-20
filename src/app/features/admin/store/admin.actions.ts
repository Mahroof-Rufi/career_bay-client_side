import { createAction, props } from "@ngrx/store";
import { User } from "./admin.model";

export const loadUsers = createAction("loadUsers")
export const loadUserSuccess = createAction("loadUsersSuccess", props<{ users:User[] }>())