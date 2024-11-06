import { api } from '../api';

interface ICreateGroup{
    title: string
    description: string
}


export async function createGroup(body: ICreateGroup) {
    return await api.post(/group/create, body)
}
