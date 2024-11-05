import { api } from '../api';

interface ICreateParticipant {
    userId: number
    eventId: number
    role: string
}


export async function createParticipant(body: ICreateParticipant) {
    return await api.post(`/participant/create`, body)
}   
