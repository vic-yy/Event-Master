import { api } from "../api";

export const getParticipantById = async (userId: number, eventId:number) => {
    const response = await api.get(`/participant/getByUserIdEventId/${userId}/${eventId}`);
    return response.data;
}