import { api } from '../api';

export async function deleteEventGroup(event_groupId: number) {
    return await api.delete(`/eventGroup/delete/${event_groupId}`)
}
