import { Request, Response, NextFunction } from "express";
import statusCodes from "../../utils/constants/statusCode";
import { PermissionError } from "../../errors/PermissionError";

export function checkRole(role: string[]){
    return (req: Request, res: Response, next: NextFunction) => {
            if(!(role.includes(req.body.role))) {
                res.status(statusCodes.UNAUTHORIZED);
                throw new PermissionError("permissionDenied");
            }
            next();
    };
}