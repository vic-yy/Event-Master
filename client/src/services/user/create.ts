import { api } from '../api'

interface ICreateUser {
    name: string
    email: string
    password: string
}

export async function createUser(body: ICreateUser) {
    return await api.post('/user/create', body)
}
