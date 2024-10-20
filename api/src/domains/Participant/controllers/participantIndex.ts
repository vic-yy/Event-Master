import { NextFunction, Request, Response, Router } from 'express';
import statusCodes from '../../../../utils/constants/statusCode';
import participantService from '../services/participantService';
import { loginMiddleware, notLoggedInMiddleware, logoutMiddleware, verifyJWT } from '../../../middlewares/auth-middlewares';
import { checkRole } from '../../../middlewares/checkRole';
import { Role } from '../../../../utils/constants/role';

const router = Router();
router.post('/login', notLoggedInMiddleware, loginMiddleware);

router.post('/logout', logoutMiddleware);

router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const participant = await participantService.createParticipant(req.body);
        const protectedParticipant = await participantService.protectParticipant(participant);
        res.status(statusCodes.CREATED).send(protectedParticipant);
    } catch (error) {
        next(error);
    }
});

router.get('/getAll', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const participants = await participantService.getAllParticipants();
        const protectedClients = await Promise.all(participants.map(async (client:any) => {
            return await participantService.protectParticipant(client);
        }));
        res.status(statusCodes.SUCCESS).json(protectedClients);
    } catch (error) {
        next(error);
    }
});

router.get('/getById/:participantId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const participant = await participantService.getParticipantById(Number(req.params.participantId));
        const protectedParticipant = await participantService.protectParticipant(participant);
        res.status(statusCodes.SUCCESS).send(protectedParticipant);
    } catch (error) {
        next(error);
    }
});

router.get('/getByUserIdEventId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const participant = await participantService.getParticipantByUserIdEventId(Number(req.body.userId), Number(req.body.eventId));
        const protectedParticipant = await participantService.protectParticipant(participant);
        res.status(statusCodes.SUCCESS).send(protectedParticipant);
    } catch (error) {
        next(error);
    }
});

router.put('/update/:participantId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const participant = await participantService.updateParticipant(Number(req.params.participantId), req.body);
        res.status(statusCodes.SUCCESS).json("Participant updated successfully");
    } catch (error) {
        next(error);
    }
});

router.put('/updateRole/:participantId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const participant = await participantService.updateParticipantRole(Number(req.params.participantId), req.body.role);
        res.status(statusCodes.SUCCESS).json("Role updated successfully");
    } catch (error) {
        next(error);
    }
});


router.delete('/delete/:participantId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const participant = await participantService.deleteParticipantById(Number(req.params.participantId));
        res.status(statusCodes.SUCCESS).send("Participant deleted successfully.");
    } catch (error) {
        next(error);
    }
});

router.delete('/deleteByUserIdEventId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const participant = await participantService.deleteParticipantByUserIdEventId(req.body);
        res.status(statusCodes.SUCCESS).send("Participant deleted successfully.");
    } catch (error) {
        next(error);
    }
});

export default router;
