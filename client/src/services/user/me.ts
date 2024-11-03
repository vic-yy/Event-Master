import { api } from "../api";

export async function getMyself() {
    return await api.get('/user/me')
}