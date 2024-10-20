import { User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { PermissionError } from "../../errors/PermissionError";
import { LoginError } from "../../errors/LoginError";
import statusCodes from "../../utils/constants/statusCode";
import bcrypt from 'bcrypt';
import userService from "../domains/User/services/userService";
import dotenv from 'dotenv';
export interface IGetUserAuthInfoRequest extends Request {
    user: string 
  }

dotenv.config();

export function generateJWT(user:User, res:Response){
	const body = {
		email: user.email,
		name: user.name,
		role: user.role,
		id: user.userId,
	};

	const token = sign({user: body}, process.env.SECRET_KEY || "", {expiresIn: process.env.JWT_EXPIRATION});

	res.cookie('jwt', token,{
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development'
	});	
}

export async function loginMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await userService.getUserByEmail(req.body.email);
        if (!user) {
            res.status(statusCodes.UNAUTHORIZED).json('E-mail e/ou senha incorretos');
            throw new PermissionError('permissionDenied');
        }

        const matchingPassword = await bcrypt.compare(req.body.password, user.password);
        if (!matchingPassword) {
            res.status(statusCodes.UNAUTHORIZED).json('E-mail e/ou senha incorretos');
            throw new PermissionError('permissionDenied');
        }

        generateJWT(user, res);

        res.status(statusCodes.SUCCESS).json(`Seja bem vindo, ${user.name}!`).end();
    } catch (error) {
        next(error); // Chame o next com o erro, sem retornar explicitamente um valor.
    }
}


function cookieExtractor(req : Request){
	let token = null;

	if(req && req.cookies){
		token = req.cookies['jwt'];
	}

	return token;
}

export function verifyJWT(req:IGetUserAuthInfoRequest, res:Response, next:NextFunction){
	try{
		const token = cookieExtractor(req);
		if(token){
			const decoded = verify(token, process.env.SECRET_KEY || "") as JwtPayload;
			req.user = decoded.user;
		}
		
		if(!req.user){
			throw new PermissionError('permissionDenied');
		}
		next();
	}catch(error){
		next(error);
	}
}

export function notLoggedInMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = cookieExtractor(req);

        if (token) {
            const decoded = verify(token, process.env.SECRET_KEY || '');
            if (decoded) {
                throw new LoginError('loginFailed');
            }
        }
        next();
    } catch (error) {
        next(error);
    }
}

export function logoutMiddleware(req:Request, res:Response, next:NextFunction){
	try{
		if (!req.body){
			throw new PermissionError('permissionDenied');
		}else{
			res.clearCookie('jwt').json("Logout efetuado com sucesso!");
			next();
		}
	}catch(error){
		next(error);
	}
}

