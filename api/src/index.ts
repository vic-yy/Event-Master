import { app } from '../config/expressConfig';
import dotenv from 'dotenv';
dotenv.config();

import userRouter from './domains/User/controllers/userIndex';
import eventRouter from './domains/Event/controllers/eventIndex';

app.use('/api/user', userRouter);
app.use('/api/event', eventRouter);

app.listen(process.env.PORT, () => {
    console.log('Servidor hosteado na porta ' + process.env.PORT);
});