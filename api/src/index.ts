import { app } from '../config/expressConfig';
import dotenv from 'dotenv';
dotenv.config();

import userRouter from './domains/User/controllers/userIndex';
import eventRouter from './domains/Event/controllers/eventIndex';
import errorHandler from './middlewares/errorHandler';
import participantRouter from './domains/Participant/controllers/participantIndex';
import groupRouter from './domains/Group/controllers/groupIndex';
import userGroupRouter from './domains/User-Group/controllers/userGroupIndex';
import groupEventRouter from './domains/Group-Event/controllers/groupEventIndex';

app.use('/api/user', userRouter);
app.use('/api/participant', participantRouter);
app.use('/api/event', eventRouter);
app.use('/api/group', groupRouter);
app.use('/api/userGroup', userGroupRouter);
app.use('/api/eventGroup', groupEventRouter);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log('Servidor hosteado na porta ' + process.env.PORT);
});