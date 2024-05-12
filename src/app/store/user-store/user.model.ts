export interface User {
    _id: string,
    firstName: string,
    lastName?: string,
    email: string,
    jobTitle?: string,
    industry?: string,
    DOB?: Date,
    gender?: string,
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

export interface userStateModel {
    user:User,
    jobs:Job[]
}