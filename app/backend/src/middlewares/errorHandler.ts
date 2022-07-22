// errorHandler to use in app listener
import { Request, Response, NextFunction } from 'express';
import { IError } from '../protocols';
import { httpStatus, messages } from '../utils';

const errorHandler = (error: IError, _req: Request, res: Response, _next: NextFunction) => {
  if (error.status) {
    return res.status(error.status).json({ message: error.message });
  }
  return res.status(httpStatus.internalError).json(error.message);
};

export default errorHandler;
