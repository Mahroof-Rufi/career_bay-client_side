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
    skills?: string[]
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
    active: boolean,
    postedAt: Date
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
    jobs:Job[]
}