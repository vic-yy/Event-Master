import prisma from '../../../../database/prismaClient';
import { QueryError} from '../../../../errors/QueryError';


class ParticipantService {

  async createParticipant(body: {userId: number, eventId: number,  role: string}) {
    const sameParticipant = await prisma.participant.findUnique({where: {userId_eventId: {userId: body.userId, eventId: body.eventId}}});
    if(sameParticipant){
        throw new QueryError('participantAlreadyExists');
    }
    const newParticipant = await prisma.participant.create({data: body});
    return newParticipant;
  }

  async getParticipantByUserIdEventId(userId: number, eventId: number) {
    const participant = await prisma.participant.findUnique({where: {userId_eventId: {userId: userId, eventId: eventId}}});
    if(!participant){
        throw new QueryError('participantNotFound');
    }
    return participant;
  }


  async getParticipantById(participantId: number) {
    const participant = await prisma.participant.findUnique({where: {participantId}});
    if(!participant){
        throw new QueryError('participantNotFound');
    }
    return participant;
  }
  async getParticipantsByUserId(userId: number) {
    const participants = await prisma.participant.findMany({ where: { userId: userId } });
    if (participants.length === 0) {
      throw new QueryError('participantNotFound');
    }
    return participants;
  }

  async getParticipantByEventId(eventId: number) {
    const participant = await prisma.participant.findMany({where: {eventId: eventId}});
    if(!participant){
        throw new QueryError('participantNotFound');
    }
    return participant;
  }


  async getAllParticipants() {
    const participants = await prisma.participant.findMany();
    return participants;
  }

  async updateParticipantRole(participantId: number, role: string) {
    const participant = await prisma.participant.findUnique({where: {participantId}});
    if(!participant){
        throw new QueryError('participantNotFound');
    }
    await prisma.participant.update({where: {participantId}, data: {role: role}});
    return participant;
  }

  async deleteParticipantById(participantId: number) {
    const participant = await prisma.participant.findUnique({where: {participantId}});
    if(!participant){
        throw new QueryError('participantNotFound');
    }
    await prisma.participant.delete({where: {participantId}});
    return participant;
  }

  async deleteParticipantByUserId(userId: number) {
    const participant = await prisma.participant.findMany({where: {userId}});
    if(!participant){
        throw new QueryError('participantNotFound');
    }
    await prisma.participant.deleteMany({where: {userId}});
    return participant;
  }


  async deleteParticipantByUserIdEventId(userId: number, eventId: number) {
    const participant = await prisma.participant.findUnique({where: {userId_eventId: {userId, eventId}}});
    if(!participant){
        throw new QueryError('participantNotFound');
    }
    await prisma.participant.delete({where: {userId_eventId: {userId, eventId}}});
    return participant;
  }
}
export default new ParticipantService();
