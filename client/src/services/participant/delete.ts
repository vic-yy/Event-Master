import { api } from '../api';

export async function deleteParticipant(participantId: number) {
    return await api.delete(`/participant/delete/${participantId}`)
}
