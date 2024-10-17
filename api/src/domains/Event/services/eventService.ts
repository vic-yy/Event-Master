import { Event } from '@prisma/client';
import prisma from '../../../../database/prismaClient';
import { QueryError } from '../../../../errors/QueryError';
import { emptyInputValidator, invalidInputValidator } from '../../../middlewares/InputValidator';


class EventService {
    async createEvent(body: {title: string, description: string, location: string, date: Date}) {
        const newEvent = await prisma.event.create({data: {...body, date: new Date(body.date)}});
        return newEvent;
    }
    
    async getEventById(eventId: number) {
        const event = await prisma.event.findUnique({where: {eventId}});
        if(!event){
            throw new QueryError('eventNotFound');
        }
        return event;
    }

    async getEventByTitle(title: string) {
        const event = await prisma.event.findFirst({where: {title}});
        return event;
    }
    
    async getAllEvents() {
        const events = await prisma.event.findMany();
        return events;
    }
    
    async updateEvent(eventId: number, body: {name?: string, description?: string, date?: Date}) {
        const event = await prisma.event.findUnique({where: {eventId}});
        if(!event){
            throw new QueryError('eventNotFound');
        }
        const updatedEvent = await prisma.event.update({where: {eventId}, data: body});
        return updatedEvent;
    }
    
    async deleteEvent(eventId: number) {
        const event = await prisma.event.findUnique({where: {eventId}});
        if(!event){
            throw new QueryError('eventNotFound');
        }
        await prisma.event.delete({where: {eventId}});
        return event;
    }
};

export default new EventService();