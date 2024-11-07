import { api } from '../api';

export async function deleteEvent(eventId: number) {
    return await api.delete(`/event/delete/${eventId}`)
}
