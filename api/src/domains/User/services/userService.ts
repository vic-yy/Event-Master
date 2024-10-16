import { User } from '@prisma/client';
import prisma from '../../../../database/prismaClient';
import { QueryError} from '../../../../errors/QueryError';
import { PasswordError } from '../../../../errors/PasswordError';
import { emptyInputValidator, invalidInputValidator } from '../../../middlewares/InputValidator';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { TokenError } from '../../../../errors/TokenError';

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

  async encryptPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async createUser(body: {email: string, name: string, password: string}) {
    const sameUser = await prisma.user.findUnique({where: {email: body.email}});
    if(sameUser){
        throw new QueryError('userAlreadyExists');
    }
    const encryptedPassword = await this.encryptPassword(body.password);
    emptyInputValidator(body);
    invalidInputValidator(body);
    const newUser = await prisma.user.create({data: {...body, password: encryptedPassword ,role: 'user'}});
    return newUser;
  }

  async getUserById(userId: number) {
    const user = await prisma.user.findUnique({where: {userId}});
    if(!user){
        throw new QueryError('userNotFound');
    }
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({where: {email}});
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

  async updatePassword(email: string, newPassword: string) {
    const user = await prisma.user.findUnique({where: {email: email}});
    if(!user){
        throw new QueryError('userNotFound');
    }
    invalidInputValidator({password: newPassword});
    const encryptedPassword = await this.encryptPassword(newPassword);
    await prisma.user.update({where: {email: email}, data: {password: encryptedPassword}});
    return user;
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

  async createToken(email: string) {
    const user = await prisma.user.findUnique({where: {email: email}});
    if(!user){
        throw new QueryError('userNotFound');
    }

    const token = crypto.randomBytes(20).toString('hex').toString();
    const date = new Date();
    date.setHours(date.getHours() + 1);


    await prisma.user.update({
      where: { 
        email: email,
      },
      data: {
        token: token,
        tokenExpiration: date,
      }
    });

    const info = {
      email: email,
      token: token,
    };


    return token;
  }

  async validateToken(email: string, token: string, passowrd: string) {
    const user = await prisma.user.findUnique({where: {email: email}});
    const timeNow = new Date();
    if((user?.token != token)){
      throw new TokenError('invalidToken');
    }
    if(user?.tokenExpiration != null && user.tokenExpiration < timeNow){
      throw new TokenError('expiredToken');
    }
    return;
  }
}
export default new UserService();