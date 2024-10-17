import { NextFunction, Router, Request, Response } from "express";
import eventService from "../services/eventService";
import statusCodes from "../../../../utils/constants/statusCode";

const router = Router();

router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
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
        const event = await eventService.getEventById(Number(req.params.eventId));
        res.status(statusCodes.SUCCESS).send(event);
    } catch (error) {
        next(error);
    }
});


router.put('/update/:eventId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event = await eventService.updateEvent(Number(req.params.eventId), req.body);
        res.status(statusCodes.SUCCESS).json("Event updated successfully");
    } catch (error) {
        next(error);
    }
});

router.delete('/delete/:eventId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await eventService.deleteEvent(Number(req.params.eventId));
        res.status(statusCodes.SUCCESS).json("Event deleted successfully");
    } catch (error) {
        next(error);
    }
});

export default router;