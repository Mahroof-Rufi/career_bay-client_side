export interface Chat {
    sender: string,
    receiver: string,
    content: string,
    profileType: 'User' | 'Employer',
    createdAt: Date
}