import { User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { PermissionError } from "../../errors/PermissionError";
import { LoginError } from "../../errors/LoginError";
import statusCodes from "../../utils/constants/statusCode";
import bcrypt from 'bcrypt';
import userService from "../domains/User/services/userService";
import dotenv from 'dotenv';
import { QueryError } from "../../errors/QueryError";


dotenv.config();

export function generateJWT(user:User, res:Response){
	const body = {
		email: user.email,
		name: user.name,
		role: user.role,
		id: user.userId,
	};

	const token = sign({user: body}, process.env.JWT_SECRET || "", {expiresIn: process.env.JWT_EXPIRATION});

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
            throw new QueryError('userNotFound');
        }

        const matchingPassword = await bcrypt.compare(req.body.password, user.password);
        if (!matchingPassword) {
            res.status(statusCodes.UNAUTHORIZED).json('E-mail e/ou senha incorretos');
            throw new LoginError('loginFailed');
        }

        generateJWT(user, res);

        res.status(statusCodes.SUCCESS).json(`Seja bem vindo, ${user.name}!`).end();
    } catch (error) {
        next(error); 
    }
}


function cookieExtractor(req: Request) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
	}
return token;
}


export function verifyJWT(req:Request, res:Response, next:NextFunction){
	try{
		const token = cookieExtractor(req);
		if(token){
			const secretKey = process.env.JWT_SECRET;
			if (!secretKey) {
				throw new Error('JWT_SECRET is not defined');
			}
			const decoded = verify(token, secretKey) as JwtPayload;
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

        console.log(token)

        if (token) {
            const decoded = verify(token, process.env.JWT_SECRET || '');
            if (decoded) {
				console.log("Usuário já está logado:", decoded);
                throw new LoginError('alreadyLoggedIn');
            }
        }
        next();
    } catch (error) {
        next(error);
    }
}

export function logoutMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        res.clearCookie('jwt').json("Logout efetuado com sucesso!");
        next();
    } catch (error) {
        next(error);
    }
}


