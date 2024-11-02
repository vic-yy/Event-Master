import { NextFunction, Request, Response, Router } from 'express';
import statusCodes from '../../../../utils/constants/statusCode';
import eventGroupService from '../services/eventGroupService';
import { verifyJWT } from '../../../middlewares/auth-middlewares';

const router = Router();

router.post('/create',  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event_group = await eventGroupService.createEventGroup(req.body);
        res.status(statusCodes.CREATED).send(event_group);
    } catch (error) {
        next(error);
    }
});

router.get('/getAll',  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event_groups = await eventGroupService.getAllEventGroups();
        res.status(statusCodes.SUCCESS).json(event_groups);
    } catch (error) {
        next(error);
    }
});

router.get('/getById/:event_groupId',  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event_group = await eventGroupService.getEventGroupById(Number(req.params.event_groupId));
        res.status(statusCodes.SUCCESS).send(event_group);
    } catch (error) {
        next(error);
    }
});

router.get('/getByEventId/:eventId',  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event_groups = await eventGroupService.getEventGroupByEventId(Number(req.params.eventId));
        res.status(statusCodes.SUCCESS).json(event_groups);
    } catch (error) {
        next(error);
    }
});

router.get('/getByGroupId/:groupId',  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event_groups = await eventGroupService.getEventGroupByGroupId(Number(req.params.groupId));
        res.status(statusCodes.SUCCESS).json(event_groups);
    } catch (error) {
        next(error);
    }
});

router.get('/getByEventIdGroupId',  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event_group = await eventGroupService.getEventGroupByEventIdGroupId(Number(req.body.eventId), Number(req.body.groupId));
        res.status(statusCodes.SUCCESS).send(event_group);
    } catch (error) {
        next(error);
    }
});

router.put('/update/:event_groupId',  async (req: Request, res: Response, next: NextFunction) => {
    try {
        await eventGroupService.updateEventGroup(Number(req.params.event_groupId), req.body);
        res.status(statusCodes.SUCCESS).json("Event-Group updated successfully");
    } catch (error) {
        next(error);
    }
});

router.delete('/delete/:event_groupId',  async (req: Request, res: Response, next: NextFunction) => {
    try {
        await eventGroupService.deleteEventGroupById(Number(req.params.event_groupId));
        res.status(statusCodes.SUCCESS).send("Event-Group deleted successfully.");
    } catch (error) {
        next(error);
    }
});

router.delete('/deleteByEventIdGroupId',  async (req: Request, res: Response, next: NextFunction) => {
    try {
        await eventGroupService.deleteEventGroupByEventIdGroupId(Number(req.body.eventId), Number(req.body.groupId));
        res.status(statusCodes.SUCCESS).send("Event-Group deleted successfully.");
    } catch (error) {
        next(error);
    }
});

export default router;
