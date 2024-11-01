import { NextFunction, Request, Response, Router } from 'express';
import statusCodes from '../../../../utils/constants/statusCode';
import participantService from '../services/participantService';

const router = Router();

router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const participant = await participantService.createParticipant(req.body);
        res.status(statusCodes.CREATED).send(participant);
    } catch (error) {
        next(error);
    }
});

router.get('/getAll', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const participants = await participantService.getAllParticipants();
        res.status(statusCodes.SUCCESS).json(participants);
    } catch (error) {
        next(error);
    }
});

router.get('/getByParticipantId/:participantId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const participant = await participantService.getParticipantById(Number(req.params.participantId));
        res.status(statusCodes.SUCCESS).send(participant);
    } catch (error) {
        next(error);
    }
});

router.get('/getByUserId/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const participants = await participantService.getParticipantsByUserId(Number(req.params.userId));
        res.status(statusCodes.SUCCESS).json(participants);
    } catch (error) {
        next(error);
    }
});

router.get('/getByEventId/:eventId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const participants = await participantService.getParticipantByEventId(Number(req.params.eventId));
        res.status(statusCodes.SUCCESS).json(participants);
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


router.delete('/deleteByParticipant/:participantId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const participant = await participantService.deleteParticipantById(Number(req.params.participantId));
        res.status(statusCodes.SUCCESS).send("Participant deleted successfully.");
    } catch (error) {
        next(error);
    }
});

router.delete('/deleteByUserId/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const participant = await participantService.deleteParticipantByUserId(Number(req.params.userId));
        res.status(statusCodes.SUCCESS).send("Participant deleted successfully.");
    } catch (error) {
        next(error);
    }
});

router.delete('/deleteByEventId/:eventId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const participant = await participantService.getParticipantByEventId(Number(req.params.eventId));
        res.status(statusCodes.SUCCESS).send("Participants deleted successfully.");
    } catch (error) {
        next(error);
    }
});

router.delete('/deleteByUserIdEventId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const participant = await participantService
        .deleteParticipantByUserIdEventId(Number(req.body.userId), Number(req.body.eventId));
        res.status(statusCodes.SUCCESS).send("Participant deleted successfully.");
    } catch (error) {
        next(error);
    }
});

export default router;