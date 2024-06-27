import { Employer } from "../../company/store/employer.model"

export interface User {
    _id: string,
    firstName: string,
    lastName?: string,
    profile_url?: string,
    email: string,
    jobTitle: string,
    industry: string,
    DOB?: Date,
    gender: string,
    city?: string,
    state?: string,
    remort: boolean,
    resume_url?: string,
    phone?: number,
    portfolio_url?: string,
    gitHub_url?: string,
    about?: string,
    experiences?: experience[],
    educations?: education[],
    skills?: string[],
    appliedJobs?: string[]
}

export interface UserMainDetails {
    _id: string,
    firstName: string,
    lastName?: string,
    profile_url?: string,
    email: string,
    jobTitle: string,
    industry: string,
    DOB?: Date,
    gender: string,
    city?: string,
    state?: string,
    remort: boolean,
    resume_url?: string,
    phone?: number,
    portfolio_url?: string,
    gitHub_url?: string,
}

export interface experience {
    _id?:string,
    jobTitle: string,
    companyName: string,
    jobType: string,
    startDate: Date,
    endDate?: Date,
    present: boolean,
    city?: string,
    state?: string,
    remort: boolean,
    overView: string,
    technologies: string[],
}

export interface education {
    _id?:string,
    universityName: string,
    city?: string,
    state?: string,
    distance: boolean,
    subject: string,
    startDate: Date,
    endDate?: Date,
    present: boolean
}

export interface Job {
    _id: string,
    company_id: string,
    jobTitle: string,
    city?: string,
    state?: string,
    remort: boolean,
    jobType: string,
    minimumPay: number,
    maximumPay: number,
    payType: string,
    experienceLevel: string,
    workShift: string,
    overView: string,
    responsibilities: string[],
    qualifications: string[],
    isActive: boolean,
    isClosed: boolean,
    postedAt: Date,
    applicants?: string[]
}

export interface EditUser {
    firstName?: string,
    lastName?: string,
    profile_file?: string,
    jobTitle?: string,
    industry?: string,
    DOB?: Date,
    gender?: string,
    city?: string,
    state?: string,
    remort?: boolean,
    resumeFile?: string,
    portfolio_url?: string,
    gitHub_url?: string,
    about?: string,
    experiences?: experience[],
    educations?: education[],
    skills?: string[]
}

export interface userStateModel {
    user:User,
    jobs:Job[],
    savedJobs:Job[],
    AppliedJobs: AppliedJobs[]
    posts:any,
    users:User[],
    totalUserProfiles:number,
    companies:Employer[],
    totalEmployerProfiles:number,
    isApplied:boolean,
    isSaved:boolean,
}

export interface AppliedJob {
    job_id: string,
    status: string
}

export interface AppliedJobs{
    user_id: string,
    appliedJobs: [AppliedJob]
}

export interface Comment {
    user_id: String;
    comment: string;
}

export interface Post {
    _id: string;
    employer_id: string,
    image_urls: string[];
    description: string;
    likes: string[];
    comments: Comment[];
    saved: string[];
}

export interface Posts {
    posts: Post[];
}