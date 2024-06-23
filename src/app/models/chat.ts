import { interviewDetails } from "./subModels/interviewDetails";

export interface Chat {
    _id:string,
    sender: string,
    receiver: string,
    isMediaFile: boolean,
    content: string,
    createdAt: Date,
    type: 'text' | 'image' | 'video' | 'raw' | 'interview' | 'URL',
    interviewDetails: interviewDetails
}