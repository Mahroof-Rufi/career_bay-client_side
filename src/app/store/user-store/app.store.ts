import { appStateModel } from "./app.model";

export const initialState: appStateModel = {
    employer: {
      _id: '',
      companyName: '',
      profile_url: '',
      email: '',
      industry: '',
      city: '',
      state: ''
    },
    user: {
      _id: '',
      firstName: '',
      lastName: '',
      email: '',
      jobTitle: '',
      industry: '',
      DOB: undefined,
      gender: ''
    }
}


