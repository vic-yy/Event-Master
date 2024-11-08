import { api } from "../api";

interface ILogin {
    email: string;
    password: string;
};

export async function login(body: ILogin) {
    return await api.post('/user/login', body)
}