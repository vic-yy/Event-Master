import { NextFunction, Request, Response, Router } from 'express';
import statusCodes from '../../../../utils/constants/statusCode';
import userService from '../services/userService';

const router = Router();

router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.createUser(req.body);
        const protectedUser = await userService.protectUser(user);
        res.status(statusCodes.CREATED).send(protectedUser);
    } catch (error) {
        next(error);
    }
});

router.get('/getAll', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();
        const protectedClients = await Promise.all(users.map(async (client:any) => {
            return await userService.protectUser(client);
        }));
        res.status(statusCodes.SUCCESS).json(protectedClients);
    } catch (error) {
        next(error);
    }
});

router.get('/getById/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.getUserById(Number(req.params.userId));
        const protectedUser = await userService.protectUser(user);
        res.status(statusCodes.SUCCESS).send(protectedUser);
    } catch (error) {
        next(error);
    }
});

router.put('/update/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.updateUser(Number(req.params.userId), req.body);
        res.status(statusCodes.SUCCESS).json("User updated successfully");
    } catch (error) {
        next(error);
    }
});


router.delete('/delete/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.deleteUserById(Number(req.params.userId));
        res.status(statusCodes.SUCCESS).send("User deleted successfully.");
    } catch (error) {
        next(error);
    }
});

router.delete('/deleteByEmail', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.deleteUserByEmail(req.body);
        res.status(statusCodes.SUCCESS).send("User deleted successfully.");
    } catch (error) {
        next(error);
    }
});

export default router;