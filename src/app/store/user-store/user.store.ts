import { userStateModel } from "./user.model";


export const initialState: userStateModel = {
  user: {
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
    industry: '',
    DOB: undefined,
    gender: ''
  },
  jobs: []
}


