import { Request, Response, NextFunction } from "express";
import statusCodes from "../../utils/constants/statusCode";
import { PermissionError } from "../../errors/PermissionError";


export function checkRole(roles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) { 
            res.status(statusCodes.UNAUTHORIZED);
            throw new PermissionError("permissionDenied");
        }
        next();
    };
}
