import { api } from '../api';

interface ICreateEventGroup{
    eventId: number
    groupId: number
}


export async function createEventGroup(body: ICreateEventGroup) {
    return await api.post(/eventGroup/create, body)
}
