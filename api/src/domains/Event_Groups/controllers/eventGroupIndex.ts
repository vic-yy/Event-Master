import { NextFunction, Request, Response, Router } from 'express';
import statusCodes from '../../../../utils/constants/statusCode';
import eventGroupService from '../services/eventGroupService';
import { loginMiddleware, notLoggedInMiddleware, logoutMiddleware, verifyJWT } from '../../../middlewares/auth-middlewares';
import { checkRole } from '../../../middlewares/checkRole';
import { Role } from '../../../../utils/constants/participantRole';

const router = Router();

router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event_group = await eventGroupService.createEventGroup(req.body);
        const protectedEventGroup = await eventGroupService.protectEventGroup(event_group);
        res.status(statusCodes.CREATED).send(protectedEventGroup);
    } catch (error) {
        next(error);
    }
});

router.get('/getAll', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event_groups = await eventGroupService.getAllEventGroups();
        const protectedClients = await Promise.all(eventGroups.map(async (client:any) => {
            return await eventGroupService.protectEventGroup(client);
        }));
        res.status(statusCodes.SUCCESS).json(protectedClients);
    } catch (error) {
        next(error);
    }
});

router.get('/getById/:event_groupId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event_group = await eventGroupService.getEventGroupById(Number(req.params.event_groupId));
        const protectedEventGroup = await eventGroupService.protectEventGroup(event_group);
        res.status(statusCodes.SUCCESS).send(protectedEventGroup);
    } catch (error) {
        next(error);
    }
});

router.get('/getByEventId/:eventId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event_groups = await eventGroupService.getEventGroupByEventId(Number(req.params.eventId));
        const protectedClients = await Promise.all(event_groups.map(async (client:any) => {
            return await eventGroupService.protectEventGroup(client);
        }));
        res.status(statusCodes.SUCCESS).json(protectedClients);
    } catch (error) {
        next(error);
    }
});

router.get('/getByGroupId/:groupId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event_groups = await eventGroupService.getEventGroupByGroupId(Number(req.params.groupId));
        const protectedClients = await Promise.all(event_groups.map(async (client:any) => {
            return await eventGroupService.protectEventGroup(client);
        }));
        res.status(statusCodes.SUCCESS).json(protectedClients);
    } catch (error) {
        next(error);
    }
});

router.get('/getByEventIdGroupId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event_group = await eventGroupService.getEventGroupByEventIdGroupId(Number(req.body.eventId), Number(req.body.groupId));
        const protectedEventGroup = await eventGroupService.protectEventGroup(event_group);
        res.status(statusCodes.SUCCESS).send(protectedEventGroup);
    } catch (error) {
        next(error);
    }
});

router.put('/update/:event_groupId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event_group = await eventGroupService.updateEventGroup(Number(req.params.event_groupId), req.body);
        res.status(statusCodes.SUCCESS).json("Event-Group updated successfully");
    } catch (error) {
        next(error);
    }
});

router.put('/updateRole/:event_groupId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event_group = await eventGroupService.updateEventGroupRole(Number(req.params.event_groupId), req.body.role);
        res.status(statusCodes.SUCCESS).json("Role updated successfully");
    } catch (error) {
        next(error);
    }
});


router.delete('/delete/:event_groupId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event_group = await eventGroupService.deleteEventGroupById(Number(req.params.event_groupId));
        res.status(statusCodes.SUCCESS).send("Event-Group deleted successfully.");
    } catch (error) {
        next(error);
    }
});

router.get('/deleteByEventId/:eventId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event_group = await eventGroupService.deleteEventGroupByEventId(Number(req.params.eventId));
        res.status(statusCodes.SUCCESS).send("Event-Groups deleted successfully.");
    } catch (error) {
        next(error);
    }
});

router.get('/deleteByGroupId/:groupId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event_group = await eventGroupService.deleteEventGroupByGroupId(Number(req.params.groupId));
        res.status(statusCodes.SUCCESS).send("Event-Groups deleted successfully.");
    } catch (error) {
        next(error);
    }
});

router.delete('/deleteByEventIdGroupId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event_group = await eventGroupService.deleteEventGroupByEventIdGroupId(Number(req.body.eventId), Number(req.body.groupId));
        res.status(statusCodes.SUCCESS).send("Event-Group deleted successfully.");
    } catch (error) {
        next(error);
    }
});
