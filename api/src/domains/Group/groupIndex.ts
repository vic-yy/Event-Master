import { NextFunction, Router, Request, Response } from "express";
import groupService from "../services/groupService";
import userGroupService from '../../User_Group/services/userGroupService';
import eventGroupService from '../../Event_Group/services/eventGroupService';
import statusCodes from "../../../../utils/constants/statusCode";
import { isValidDate } from "../../../middlewares/InputValidator";
import { NotAuthorizedError } from "../../../../errors/NotAuthorizedError";
import { InvalidParamError } from "../../../../errors/InvalidParamError";

const router = Router();

router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(req.body.date)
            isValidDate(req.body.date);
        else req.body.date = new Date();
        
        if(!req.body.title || req.body.title.trim() === '')
            throw new InvalidParamError('missingParam', 'title');
    

        const group = await groupService.createGroup(req.body);
        res.status(statusCodes.CREATED).send(group);
    } catch (error) {
        next(error);
    }
});

router.get('/getAll', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const groups = await groupService.getAllGroups();
        res.status(statusCodes.SUCCESS).json(groups);
    } catch (error) {
        next(error);
    }
});

router.get('/getById/:groupId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.params.groupId)
            throw new InvalidParamError('missingParam', 'groupId');

        const group = await groupService.getGroupById(Number(req.params.groupId));
        res.status(statusCodes.SUCCESS).send(group);
    } catch (error) {
        next(error);
    }
});


router.put('/update/:groupId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.params.groupId)
            throw new InvalidParamError('missingParam', 'groupId');

        if(req.body.groupId){
            throw new NotAuthorizedError("customMessage", "Group ID cannot be updated");
        }

        if(req.body.date)
            isValidDate(req.body.date);

        const group = await groupService.updateGroup(Number(req.params.groupId), req.body);
        res.status(statusCodes.SUCCESS).json("Group updated successfully");
    } catch (error) {
        next(error);
    }
});

router.delete('/delete/:groupId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.params.groupId)
            throw new InvalidParamError('missingParam', 'groupId');

        await groupService.deleteGroup(Number(req.params.groupId));
        res.status(statusCodes.SUCCESS).json("Group deleted successfully");
    } catch (error) {
        next(error);
    }
    try {
        const user_group = await userGroupService.deleteUserGroupByGroupId(Number(req.params.groupId));
        res.status(statusCodes.SUCCESS).send("User-Groups deleted successfully.");
    } catch (error) {
        next(error);
    }
    try {
        const event_group = await eventGroupService.deleteEventGroupByGroupId(Number(req.params.groupId));
        res.status(statusCodes.SUCCESS).send("Event-Groups deleted successfully.");
    } catch (error) {
        next(error);
    }
});

export default router;
