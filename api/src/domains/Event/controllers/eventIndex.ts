import { NextFunction, Router, Request, Response } from "express";
import eventService from "../services/eventService";
import participantService from '../../Participant/services/participantService';
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
    

        const event = await eventService.createEvent(req.body);
        res.status(statusCodes.CREATED).send(event);
    } catch (error) {
        next(error);
    }
});

router.get('/getAll', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const events = await eventService.getAllEvents();
        res.status(statusCodes.SUCCESS).json(events);
    } catch (error) {
        next(error);
    }
});

router.get('/getById/:eventId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.params.eventId)
            throw new InvalidParamError('missingParam', 'eventId');

        const event = await eventService.getEventById(Number(req.params.eventId));
        res.status(statusCodes.SUCCESS).send(event);
    } catch (error) {
        next(error);
    }
});


router.put('/update/:eventId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.params.eventId)
            throw new InvalidParamError('missingParam', 'eventId');

        if(req.body.eventId){
            throw new NotAuthorizedError("customMessage", "Event ID cannot be updated");
        }

        if(req.body.date)
            isValidDate(req.body.date);

        const event = await eventService.updateEvent(Number(req.params.eventId), req.body);
        res.status(statusCodes.SUCCESS).json("Event updated successfully");
    } catch (error) {
        next(error);
    }
});

router.delete('/delete/:eventId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.params.eventId)
            throw new InvalidParamError('missingParam', 'eventId');

        await eventService.deleteEvent(Number(req.params.eventId));
        res.status(statusCodes.SUCCESS).json("Event deleted successfully");
    } catch (error) {
        next(error);
    }
    try {
        const participant = await participantService.deleteParticipantByEventId(Number(req.params.eventId));
        res.status(statusCodes.SUCCESS).send("Participants deleted successfully.");
    } catch (error) {
        next(error);
    }
});

export default router;
