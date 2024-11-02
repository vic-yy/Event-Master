import { Request, Response, NextFunction, Router } from 'express';
import statusCodes from '../../../../utils/constants/statusCode';
import groupService from '../services/groupService';

const router = Router();

router.post('/create',  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const group = await groupService.createGroup(req.body);
        res.status(statusCodes.CREATED).send(group);
    } catch (error) {
        next(error);
    }
});

router.get('/getAll',  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const groups = await groupService.getAllGroups();
        res.status(statusCodes.SUCCESS).json(groups);
    } catch (error) {
        next(error);
    }
});

router.get('/getById/:groupId',  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const group = await groupService.getGroupById(Number(req.params.groupId));
        res.status(statusCodes.SUCCESS).send(group);
    } catch (error) {
        next(error);
    }
});

router.get('/getByTitle/:title',  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const group = await groupService.getGroupByTitle(req.params.title);
        res.status(statusCodes.SUCCESS).send(group);
    } catch (error) {
        next(error);
    }
});

router.put('/update/:groupId',  async (req: Request, res: Response, next: NextFunction) => {
    try {
        await groupService.updateGroup(Number(req.params.groupId), req.body);
        res.status(statusCodes.SUCCESS).json("Group updated successfully");
    } catch (error) {
        next(error);
    }
});

router.delete('/delete/:groupId',  async (req: Request, res: Response, next: NextFunction) => {
    try {
        await groupService.deleteGroup(Number(req.params.groupId));
        res.status(statusCodes.SUCCESS).send("Group deleted successfully.");
    } catch (error) {
        next(error);
    }
});

export default router;
