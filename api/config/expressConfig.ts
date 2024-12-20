import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import userRouter from '../src/domains/User/controllers/userIndex';
import cookieParser from 'cookie-parser';

dotenv.config();
export const app: Express = express();

const options: CorsOptions = {
    credentials: true,
    origin: process.env.APP_URL
};

app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());

export default app;