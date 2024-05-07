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

export interface Employer {
    _id: string,
    companyName: string,
    profile_url: string,
    email: string,
    industry: string,
    city: string,
    state: string,
}

export interface appStateModel {
    employer:Employer
    user:User
}