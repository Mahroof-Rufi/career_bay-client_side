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

export interface adminStateModel {
    users:User[]
}