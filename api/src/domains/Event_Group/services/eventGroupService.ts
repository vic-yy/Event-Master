import { Event_Group } from '@prisma/client';
import prisma from '../../../../database/prismaClient';
import { QueryError} from '../../../../errors/QueryError';
import { PasswordError } from '../../../../errors/PasswordError';
import { emptyInputValidator, invalidInputValidator } from '../../../middlewares/InputValidator';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { TokenError } from '../../../../errors/TokenError';

class EventGroupService {
  async protectEventGroup(body: Partial<Event_Group>) {
    const event_group = await prisma.event_Group.findUnique({where: {event_groupId: body.event_groupId}});
    if(!event_group){
        throw new QueryError('event_groupNotFound');
    }
    const protectedEventGroup = {
      event_groupId: event_group.event_groupId,
      eventId: event_group.eventId,
      groupId: event_group.groupId,
    };
    return protectedEventGroup;
  }

  async createEventGroup(body: {eventId: number, groupId: number}) {
    const sameEventGroup = await prisma.event_Group.findUnique({where: {eventId_groupId: {eventId: body.eventId, groupId: body.groupId}}});
    if(sameEventGroup){
        throw new QueryError('event_groupAlreadyExists');
    }
    const newEventGroup = await prisma.event_Group.create({data: {...body}});
    return newEventGroup;
  }

  async getEventGroupById(event_groupId: number) {
    const event_group = await prisma.event_Group.findUnique({where: {event_groupId}});
    if(!event_group){
        throw new QueryError('event_groupNotFound');
    }
    return event_group;
  }

  async getEventGroupByEventId(eventId: number) {
    const event_group = await prisma.event_Group.findMany({where: {eventId}});
    if(!event_group){
        throw new QueryError('event_groupNotFound');
    }
    return event_group;
  }

  async getEventGroupByGroupId(groupId: number) {
    const event_group = await prisma.event_Group.findMany({where: {groupId}});
    if(!event_group){
        throw new QueryError('event_groupNotFound');
    }
    return event_group;
  }

  async getEventGroupByEventIdGroupId(eventId: number, groupId: number) {
    const event_group = await prisma.event_Group.findUnique({where: {eventId_groupId: {eventId, groupId}}});
    if(!event_group){
        throw new QueryError('event_groupNotFound');
    }
    return event_group;
  }

  async getAllEventGroups() {
    const event_groups = await prisma.event_Group.findMany();
    return event_groups;
  }

  async updateEventGroup(event_groupId: number, body: {eventId?: number, groupId?: number}) {
    const event_group = await prisma.event_Group.findUnique({where: {event_groupId}});
    if(!event_group){
        throw new QueryError('event_groupNotFound');
    }
    if (body.eventId && body.groupId) {
      const sameEventGroup = await prisma.event_Group.findUnique({where: {eventId_groupId: {eventId: body.eventId, groupId: body.groupId}}});
      if (sameEventGroup && sameEventGroup.event_groupId !== event_groupId) {
        throw new QueryError('event_groupAlreadyExists');
      }
    }
    const updatedEventGroup = await prisma.event_Group.update({where: {event_groupId}, data: body});
    return updatedEventGroup;
  }

  async deleteEventGroupById(event_groupId: number) {
    const event_group = await prisma.event_Group.findUnique({where: {event_groupId}});
    if(!event_group){
        throw new QueryError('event_groupNotFound');
    }
    await prisma.event_Group.delete({where: {event_groupId}});
    return event_group;
  }

  async deleteEventGroupByEventId(eventId: number) {
    const event_group = await prisma.event_Group.findMany({where: {eventId}});
    if(!event_group){
        throw new QueryError('event_groupNotFound');
    }
    await prisma.event_Group.delete({where: {eventId}});
    return event_group;
  }

  async deleteEventGroupByGroupId(groupId: number) {
    const event_group = await prisma.event_Group.findMany({where: {groupId}});
    if(!event_group){
        throw new QueryError('event_groupNotFound');
    }
    await prisma.event_Group.delete({where: {groupId}});
    return event_group;
  }

  async deleteEventGroupByEventIdGroupId(eventId: number, groupId: number) {
    const event_group = await prisma.event_Group.findUnique({where: {eventId_groupId: {eventId, groupId}}});
    if(!event_group){
        throw new QueryError('event_groupNotFound');
    }
    await prisma.event_Group.delete({where: {eventId_groupId: {eventId, groupId}}});
    return event_group;
  }
}
export default new EventGroupService();
