import { Employer, Job } from "./employer.model";

export interface EmployerState {
  employer: Employer;
  jobs: Job[];
}

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
  jobs: []
};


