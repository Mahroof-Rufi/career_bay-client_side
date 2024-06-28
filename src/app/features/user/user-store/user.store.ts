import { userStateModel } from "./user.model";


export const initialState: userStateModel = {
  user: {
    _id: '',
    firstName: '',
    lastName: '',
    profile_url: '',
    resume_url: '',
    email: '',
    jobTitle: '',
    industry: '',
    DOB: undefined,
    remort: false,
    gender: '',
    about: '',
    city: '',
    state: '',
    gitHub_url: '',
    portfolio_url: '',
    experiences: [],
    educations: [],
    skills: [],
  },
  jobs: [],
  savedJobs: [],
  savedPosts: [],
  AppliedJobs: [],
  posts: [],
  users: [],
  totalUserProfiles: 0,
  companies: [],
  totalEmployerProfiles: 0,
  isApplied: false,
  isSaved: false,
}


