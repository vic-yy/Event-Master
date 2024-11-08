import { api } from '../api';

interface IUpdateEvent {
    title: string
    description: string
    category: string
    location: string
    date: string
    time: string
    price: string
    image: string
}


export async function updateEvent(id: number, body: IUpdateEvent) {
    return await api.put(`/event/update/${id}`, body)
}   