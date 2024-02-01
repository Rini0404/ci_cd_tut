
import { Response } from 'express';

export const sendErrorResponse = (res: Response, message: string, status: number = 500): void => {
  res.status(status).send(message);
};
