import { Participant } from '@prisma/client';
import prisma from '../../../../database/prismaClient';
import { QueryError} from '../../../../errors/QueryError';
import { PasswordError } from '../../../../errors/PasswordError';
import { emptyInputValidator, invalidInputValidator } from '../../../middlewares/InputValidator';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { TokenError } from '../../../../errors/TokenError';

class ParticipantService {
  async protectParticipant(body: Partial<Participant>) {
    const participant = await prisma.participant.findUnique({where: {participantId: body.participantId}});
    if(!participant){
        throw new QueryError('participantNotFound');
    }
    const protectedParticipant = {
      participantId: participant.participantId,
      userId: participant.userId,
      eventId: participant.eventId,
      email: participant.email,
    };
    return protectedParticipant;
  }

  async createParticipant(body: {userId: number, eventId: number, email: string}) {
    const sameParticipant = await prisma.participant.findUnique({where: {userId_eventId: {userId: body.userId, eventId: body.eventId, email: body.email}}});
    if(sameParticipant){
        throw new QueryError('participantAlreadyExists');
    }
    const newParticipant = await prisma.participant.create({data: {...body, role: 'participant'}});
    return newParticipant;
  }

  async updateParticipantRole(participantId: number, role: string) {
    const participant = await prisma.participant.findUnique({where: {participantId}});
    if(!participant){
        throw new QueryError('participantNotFound');
    }
    await prisma.participant.update({where: {participantId}, data: {role: role}});
    return participant;
  }

  async getParticipantById(participantId: number) {
    const participant = await prisma.participant.findUnique({where: {participantId}});
    if(!participant){
        throw new QueryError('participantNotFound');
    }
    return participant;
  }

  async getParticipantByUserId(userId: number) {
    const participant = await prisma.participant.findUnique({where: {userId}});
    if(!participant){
        throw new QueryError('participantNotFound');
    }
    return participant;
  }

  async getParticipantByEventId(eventId: number) {
    const participant = await prisma.participant.findUnique({where: {eventId}});
    if(!participant){
        throw new QueryError('participantNotFound');
    }
    return participant;
  }

  async getParticipantByUserIdEventId(userId: number, eventId: number) {
    const participant = await prisma.participant.findUnique({where: {userId_eventId: {userId, eventId}}});
    if(!participant){
        throw new QueryError('participantNotFound');
    }
    return participant;
  }

  async getAllParticipants() {
    const participants = await prisma.participant.findMany();
    return participants;
  }

  async updateParticipant(participantId: number, body: {userId?: number, eventId?: number, email?: email}) {
    const participant = await prisma.participant.findUnique({where: {participantId}});
    if(!participant){
        throw new QueryError('participantNotFound');
    }
    if (body.userId && body.eventId) {
      const sameParticipant = await prisma.participant.findUnique({where: {userId_eventId: {userId: body.userId, eventId: body.eventId}}});
      if (sameParticipant && sameParticipant.participantId !== participantId) {
        throw new QueryError('participantAlreadyExists');
      }
    }
    const updatedParticipant = await prisma.participant.update({where: {participantId}, data: body});
    return updatedParticipant;
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
    const participant = await prisma.participant.findUnique({where: {userId}});
    if(!participant){
        throw new QueryError('participantNotFound');
    }
    await prisma.participant.delete({where: {userId}});
    return participant;
  }

  async deleteParticipantByEventId(eventId: number) {
    const participant = await prisma.participant.findUnique({where: {eventId}});
    if(!participant){
        throw new QueryError('participantNotFound');
    }
    await prisma.participant.delete({where: {eventId}});
    return participant;
  }

  async deleteParticipantByEmail(body: {email: string}) {
    const participant = await prisma.participant.findUnique({where: {email: body.email}});
    if(!participant){
        throw new QueryError('participantNotFound');
    }
    await prisma.participant.delete({where: {participantId}});
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
