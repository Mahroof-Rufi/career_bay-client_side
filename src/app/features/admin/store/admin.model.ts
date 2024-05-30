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
    isActive:boolean,
}

export interface Employer {
    _id: string,
    companyName: string,
    profile_url: string,
    email: string,
    phone?: string,
    web_url?: string,
    X_url?: string,
    instagram_url?: string,
    industry: string,
    city: string,
    state: string,
    noOfWorkersRange?: string,
    about?: string,
    isActive: boolean
}

export interface adminStateModel {
    users:User[],
    companies:Employer[],
}