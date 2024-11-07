import { api } from "../api";

export const getParticipantByEventId = async (id: number) => {
    const response = await api.get(`/participant/getByEventId/${id}`);
    return response.data;
}
