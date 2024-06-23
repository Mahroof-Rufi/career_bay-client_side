import { interviewDetails } from "./subModels/interviewDetails";

export interface Chat {
    _id:string,
    sender: string,
    receiver: string,
    content: string,
    createdAt: Date,
    type: 'text' | 'interview' | 'URL',
    interviewDetails: interviewDetails
}