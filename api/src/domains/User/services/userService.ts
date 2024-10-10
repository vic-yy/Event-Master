import { User } from '@prisma/client';
import prisma from '../../../../database/prismaClient';
import { QueryError} from '../../../../errors/QueryError';
import { PasswordError } from '../../../../errors/PasswordError';
import { emptyInputValidator, invalidInputValidator } from '../../../middlewares/InputValidator';
class UserService {
  async protectUser(body: Partial<User>) {
    const user = await prisma.user.findUnique({where: {userId: body.userId}});
    if(!user){
        throw new QueryError('userNotFound');
    }
    const protectedUser = {
      userId: user.userId,
      email: user.email,
      name: user.name,
    };
    return protectedUser;
  }

  async createUser(body: {email: string, name: string, password: string}) {
    const sameUser = await prisma.user.findUnique({where: {email: body.email}});
    if(sameUser){
        throw new QueryError('userAlreadyExists');
    }
    emptyInputValidator(body);
    invalidInputValidator(body);
    const user = await prisma.user.create({data: {...body, role: 'user'}});
    return user;
  }

  async getUserById(userId: number) {
    const user = await prisma.user.findUnique({where: {userId}});
    if(!user){
        throw new QueryError('userNotFound');
    }
    return user;
  }

  async getAllUsers() {
    const users = await prisma.user.findMany();
    return users;
  }

  async updateUser(userId: number, body: {email?: string, name?: string, password?: string}) {
    const user = await prisma.user.findUnique({where: {userId}});
    if(!user){
        throw new QueryError('userNotFound');
    }
    if(body.email) {
      const sameUser = await prisma.user.findUnique({where: {email: body.email}});
      if(sameUser && sameUser.userId !== userId){
          throw new QueryError('userAlreadyExists');
      }
    }

    invalidInputValidator(body);
    if(body.password) {
      throw new PasswordError('routeNotAllowed');
    }
    const updatedUser = await prisma.user.update({where: {userId}, data: body});
    return updatedUser;
  }

  async deleteUserById(userId: number) {
    const user = await prisma.user.findUnique({where: {userId}});
    if(!user){
        throw new QueryError('userNotFound');
    }
    await prisma.user.delete({where: {userId}});
    return user;
  }

  async deleteUserByEmail(body: {email: string}) {
    const user = await prisma.user.findUnique({where: {email: body.email}});
    if(!user){
        throw new QueryError('userNotFound');
    }
    await prisma.user.delete({where: {email: body.email}});
    return user;
  }

}

export default new UserService();