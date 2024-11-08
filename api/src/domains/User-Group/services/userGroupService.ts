import { User_Group } from '@prisma/client';
import prisma from '../../../../database/prismaClient';
import { QueryError } from '../../../../errors/QueryError';

class UserGroupService {
    async createUserGroup(body: { userId: number; groupId: number, role: string }) {
        const sameUserGroup = await prisma.user_Group.findUnique({
            where: {
                userId_groupId: {
                    userId: body.userId,
                    groupId: body.groupId,
                },
            },
        });
        if (sameUserGroup) {
            throw new QueryError('user_groupAlreadyExists');
        }
        const newUserGroup = await prisma.user_Group.create({
            data: { ...body, role: body.role },
        });
        return newUserGroup;
    }

    async updateUserGroupRole(user_groupId: number, role: string) {
        const user_group = await prisma.user_Group.findUnique({
            where: { user_groupId },
        });
        if (!user_group) {
            throw new QueryError('user_groupNotFound');
        }
        const updatedUserGroup = await prisma.user_Group.update({
            where: { user_groupId },
            data: { role },
        });
        return updatedUserGroup;
    }

    async getUserGroupById(user_groupId: number) {
        const user_group = await prisma.user_Group.findUnique({
            where: { user_groupId },
        });
        if (!user_group) {
            throw new QueryError('user_groupNotFound');
        }
        return user_group;
    }

    async getUserGroupByUserId(userId: number) {
        const user_groups = await prisma.user_Group.findMany({
            where: { userId },
        });
        if (user_groups.length === 0) {
            throw new QueryError('user_groupNotFound');
        }
        return user_groups;
    }

    async getUserGroupByGroupId(groupId: number) {
        const user_groups = await prisma.user_Group.findMany({
            where: { groupId },
        });
        if (user_groups.length === 0) {
            throw new QueryError('user_groupNotFound');
        }
        return user_groups;
    }

    async getUserGroupByUserIdGroupId(userId: number, groupId: number) {
        const user_group = await prisma.user_Group.findUnique({
            where: { userId_groupId: { userId, groupId } },
        });
        if (!user_group) {
            throw new QueryError('user_groupNotFound');
        }
        return user_group;
    }

    async getAllUserGroups() {
        const user_groups = await prisma.user_Group.findMany();
        return user_groups;
    }

    async updateUserGroup(user_groupId: number, body: { userId?: number; groupId?: number }) {
        const user_group = await prisma.user_Group.findUnique({
            where: { user_groupId },
        });
        if (!user_group) {
            throw new QueryError('user_groupNotFound');
        }
        if (body.userId && body.groupId) {
            const sameUserGroup = await prisma.user_Group.findUnique({
                where: {
                    userId_groupId: {
                        userId: body.userId,
                        groupId: body.groupId,
                    },
                },
            });
            if (sameUserGroup && sameUserGroup.user_groupId !== user_groupId) {
                throw new QueryError('user_groupAlreadyExists');
            }
        }
        const updatedUserGroup = await prisma.user_Group.update({
            where: { user_groupId },
            data: body,
        });
        return updatedUserGroup;
    }

    async deleteUserGroupById(user_groupId: number) {
        const user_group = await prisma.user_Group.findUnique({
            where: { user_groupId },
        });
        if (!user_group) {
            throw new QueryError('user_groupNotFound');
        }
        await prisma.user_Group.delete({ where: { user_groupId } });
        return user_group;
    }

    async deleteUserGroupByUserIdGroupId(userId: number, groupId: number) {
        const user_group = await prisma.user_Group.findUnique({
            where: { userId_groupId: { userId, groupId } },
        });
        if (!user_group) {
            throw new QueryError('user_groupNotFound');
        }
        await prisma.user_Group.delete({
            where: { userId_groupId: { userId, groupId } },
        });
        return user_group;
    }
}

export default new UserGroupService();
