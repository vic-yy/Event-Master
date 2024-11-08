import { api } from "../api";

export const getEventById = async (id: number) => {
    const response = await api.get(`/event/getById/${id}`);
    return response.data;
}

export const getAll = async () => {
    const response = await api.get('/event/getAll');
    return response.data;
}