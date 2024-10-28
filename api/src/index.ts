import { app } from '../config/expressConfig';
import dotenv from 'dotenv';
dotenv.config();

import userRouter from './domains/User/controllers/userIndex';
import eventRouter from './domains/Event/controllers/eventIndex';
import participantRouter from './domains/Participant/controllers/participantIndex';
import groupRouter from './domains/Participant/controllers/groupIndex';
import userGroupRouter from './domains/Participant/controllers/userGroupIndex';
import eventGroupRouter from './domains/Participant/controllers/eventGroupIndex';

app.use('/api/user', userRouter);
app.use('/api/event', eventRouter);
app.use('/api/participant', participantRouter);
app.use('/api/group', groupRouter);
app.use('/api/userGroup', userGroupRouter);
app.use('/api/eventGroup', eventGroupRouter);

app.listen(process.env.PORT, () => {
    console.log('Servidor hosteado na porta ' + process.env.PORT);
});
