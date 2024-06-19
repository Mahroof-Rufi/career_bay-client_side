import { Employer } from "../../features/company/store/employer.model"

export interface interviewDetails {
    employer:Employer
    interviewDate: Date,
    interviewTime: String,
    status: ['scheduled', 'completed', 'canceled']
}