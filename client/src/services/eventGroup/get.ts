import { api } from "../api";

export const getEventGroupByEventId = async (id: number) => {
    const response = await api.get(`/eventGroup/getByEventId/${id}`);
    return response.data;
}
