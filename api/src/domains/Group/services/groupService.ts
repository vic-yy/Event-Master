import { Group } from '@prisma/client';
import prisma from '../../../../database/prismaClient';
import { QueryError } from '../../../../errors/QueryError';

class GroupService {
    async createGroup(body: {title: string, description: string}) {
        const newGroup = await prisma.group.create({data: {...body}});
        return newGroup;
    }
    
    async getGroupById(groupId: number) {
        const group = await prisma.group.findUnique({where: {groupId}});
        if(!group){
            throw new QueryError('groupNotFound');
        }
        return group;
    }

    async getGroupBytitle(title: string) {
        const group = await prisma.group.findFirst({where: {title}});
        return group;
    }
    
    async getAllGroups() {
        const groups = await prisma.group.findMany();
        return groups;
    }
    
    async updateGroup(groupId: number, body: {title?: string, description?: string}) {
        const group = await prisma.group.findUnique({where: {groupId}});
        if(!group){
            throw new QueryError('groupNotFound');
        }
        const updatedGroup = await prisma.group.update({where: {groupId}, data: body});
        return updatedGroup;
    }
    
    async deleteGroup(groupId: number) {
        const group = await prisma.group.findUnique({where: {groupId}});
        if(!group){
            throw new QueryError('groupNotFound');
        }
        await prisma.group.delete({where: {groupId}});
        return group;
    }
};

export default new GroupService();
