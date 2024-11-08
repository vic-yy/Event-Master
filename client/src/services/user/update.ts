import { api } from "../api";

export async function updateMainData(id: number, data: any) {
    return await api.put(`/user/update/${id}`, data);
}

export async function updatePassword(email: string, newPass: string) {
    return await api.put(`/user/updateRole/`, { email, password: newPass });
}