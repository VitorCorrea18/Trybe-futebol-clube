import { NextFunction, Request, Response } from 'express';
import { IUser } from '../protocols';
import { httpStatus, messages } from '../utils';
import { loginSchema } from '../schemas';

class Validation {
  // Joi validations and token decryption

  // SCHEMAS
  login;

  constructor() {
    this.login = loginSchema;
  }

  public validateLogin = async (req: Request, res: Response, next: NextFunction) => {
    const user: IUser = req.body;
    const { error } = this.login.validate(user);
    if (error) {
      if (error.message.includes('required')) {
        next({ status: httpStatus.badRequest, message: messages.missingField });
      } else {
        next({ status: httpStatus.badRequest, message: error.message });
      }
    }
    next();
  };
}

export default Validation;
