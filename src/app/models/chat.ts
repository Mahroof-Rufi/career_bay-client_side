import { interviewDetails } from "./subModels/interviewDetails";

export interface Chat {
    sender: string,
    receiver: string,
    content: string,
    createdAt: Date,
    type: 'text' | 'interview',
    interviewDetails: interviewDetails
}