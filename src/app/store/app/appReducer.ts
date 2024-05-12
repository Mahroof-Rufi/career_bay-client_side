import { employerReducer } from "../employer-store/employer.reducer";
import { userReducer } from "../user-store/user.reducer";

export const appState = {
    employer:employerReducer,
    user:userReducer
}