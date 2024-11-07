import { api } from '../api';

interface ICreateUserGroup{
 userId: number
 groupId: number
 role: string
}


export async function createUserGroup(body: ICreateUserGroup) {
 return await api.post(`/userGroup/create`, body)
}
