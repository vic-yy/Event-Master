import { api } from '../api';

interface ICreateEvent {
    title: string
    description: string
    category: string
    location: string
    date: string
    time: string
    price: string
    image: string
    organizer: string
}


export async function createEvent(body: ICreateEvent) {
    return await api.post(`/event/create`, body)
}   
