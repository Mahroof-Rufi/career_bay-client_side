import { EmployerState } from "./employer.model";

export const initialState: EmployerState = {
  employer: {
    _id: '',
    companyName: '',
    noOfWorkersRange: '',
    profile_url: '',
    email: '',
    phone: '',
    industry: '',
    city: '',
    state: '',
    about: '',
    web_url: '',
    X_url: '',
    instagram_url: ''
  },
  jobs: [],
  posts: [],
  applicants: {
    job_id: "",
    appliedUsers: []
  }
};


export { EmployerState };

