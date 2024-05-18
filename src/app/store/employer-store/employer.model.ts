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
    postedAt: Date,
    applicants?: string[]
}

export interface AppliedUser {
    user_id: string,
    status: string
}

export interface AppliedUsers{
    job_id: string,
    appliedUsers: []
}

export interface EmployerState {
    employer: Employer;
    jobs: Job[];
    applicants: AppliedUsers;
}
