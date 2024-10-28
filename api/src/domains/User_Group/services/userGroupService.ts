import { User_Group } from '@prisma/client';
import prisma from '../../../../database/prismaClient';
import { QueryError} from '../../../../errors/QueryError';
import { PasswordError } from '../../../../errors/PasswordError';
import { emptyInputValidator, invalidInputValidator } from '../../../middlewares/InputValidator';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { TokenError } from '../../../../errors/TokenError';

class UserGroupService {
  async protectUserGroup(body: Partial<User_Group>) {
    const user_group = await prisma.user_group.findUnique({where: {user_groupId: body.user_groupId}});
    if(!user_group){
        throw new QueryError('user_groupNotFound');
    }
    const protectedUserGroup = {
      user_groupId: user_group.user_groupId,
      userId: user_group.userId,
      groupId: user_group.groupId,
      email: 
    };
    return protectedUserGroup;
  }

  async createUserGroup(body: {userId: number, groupId: number}) {
    const sameUserGroup = await prisma.user_group.findUnique({where: {userId_groupId: {userId: body.userId, groupId: body.groupId}}});
    if(sameUserGroup){
        throw new QueryError('user_groupAlreadyExists');
    }
    const newUserGroup = await prisma.user_group.create({data: {...body, role: 'admin'}});
    return newUserGroup;
  }

  async updateUserGroupRole(user_groupId: number, role: string) {
    const user_group = await prisma.user_group.findUnique({where: {user_groupId}});
    if(!user_group){
        throw new QueryError('user_groupNotFound');
    }
    await prisma.user_group.update({where: {user_groupId}, data: {role: role}});
    return user_group;
  }

  async getUserGroupById(user_groupId: number) {
    const user_group = await prisma.user_group.findUnique({where: {user_groupId}});
    if(!user_group){
        throw new QueryError('user_groupNotFound');
    }
    return user_group;
  }

  async getUserGroupByUserId(userId: number) {
    const user_group = await prisma.user_group.findUnique({where: {userId}});
    if(!user_group){
        throw new QueryError('user_groupNotFound');
    }
    return user_group;
  }

  async getUserGroupByGroupId(groupId: number) {
    const user_group = await prisma.user_group.findUnique({where: {groupId}});
    if(!user_group){
        throw new QueryError('user_groupNotFound');
    }
    return user_group;
  }

  async getUserGroupByUserIdGroupId(userId: number, groupId: number) {
    const user_group = await prisma.user_group.findUnique({where: {userId_groupId: {userId, groupId}}});
    if(!user_group){
        throw new QueryError('user_groupNotFound');
    }
    return user_group;
  }

  async getAllUserGroups() {
    const user_groups = await prisma.user_group.findMany();
    return user_groups;
  }

  async updateUserGroup(user_groupId: number, body: {userId?: number, groupId?: number}) {
    const user_group = await prisma.user_group.findUnique({where: {user_groupId}});
    if(!user_group){
        throw new QueryError('user_groupNotFound');
    }
    if (body.userId && body.groupId) {
      const sameUserGroup = await prisma.user_group.findUnique({where: {userId_groupId: {userId: body.userId, groupId: body.groupId}}});
      if (sameUserGroup && sameUserGroup.user_groupId !== user_groupId) {
        throw new QueryError('user_groupAlreadyExists');
      }
    }
    const updatedUserGroup = await prisma.user_group.update({where: {user_groupId}, data: body});
    return updatedUserGroup;
  }

  async deleteUserGroupById(user_groupId: number) {
    const user_group = await prisma.user_group.findUnique({where: {user_groupId}});
    if(!user_group){
        throw new QueryError('user_groupNotFound');
    }
    await prisma.user_group.delete({where: {user_groupId}});
    return user_group;
  }

  async deleteUserGroupByUserId(userId: number) {
    const user_group = await prisma.user_group.findUnique({where: {userId}});
    if(!user_group){
        throw new QueryError('user_groupNotFound');
    }
    await prisma.user_group.delete({where: {userId}});
    return user_group;
  }

  async deleteUserGroupByGroupId(groupId: number) {
    const user_group = await prisma.user_group.findUnique({where: {groupId}});
    if(!user_group){
        throw new QueryError('user_groupNotFound');
    }
    await prisma.user_group.delete({where: {groupId}});
    return user_group;
  }

  async deleteUserGroupByEmail(body: {email: string}) {
    const user_group = await prisma.user_group.findUnique({where: {email: body.email}});
    if(!user_group){
        throw new QueryError('user_groupNotFound');
    }
    await prisma.user_group.delete({where: {user_groupId}});
    return user_group;
  }

  async deleteUserGroupByUserIdGroupId(userId: number, groupId: number) {
    const user_group = await prisma.user_group.findUnique({where: {userId_groupId: {userId, groupId}}});
    if(!user_group){
        throw new QueryError('user_groupNotFound');
    }
    await prisma.user_group.delete({where: {userId_groupId: {userId, groupId}}});
    return user_group;
  }
}
export default new UserGroupService();
