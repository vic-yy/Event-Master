import { api } from "../api";

export const getEventById = async (id: number) => {
    const response = await api.get(`/event/getById/${id}`);
    return response.data;
}