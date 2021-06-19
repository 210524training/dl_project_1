// teh
import expressSession from 'express-session';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import path from 'path';
import StatusCodes from 'http-status-codes';
import dotenv from 'dotenv';
import cors from 'cors';
import Log from './log';
import baseRouter from './routes/index';

dotenv.config({});

const app = express();
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3006',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));
Log.info(`__dirname: ${__dirname}`);

app.use(expressSession({
  secret: 'whatever-probably-should-be-from-env-vars',
  cookie: {},
}));

app.use('/', baseRouter);

const { BAD_REQUEST } = StatusCodes;
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('Our custom error handler');
  // Log.error(err);
  res.status(BAD_REQUEST).json({
    error: err.message,
  });

  next(err);
});

export default app;
