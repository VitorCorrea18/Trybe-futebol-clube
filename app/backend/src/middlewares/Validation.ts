import { NextFunction, Request, Response } from 'express';
import { IUser } from '../protocols';
import { httpStatus, messages } from '../utils';
import { loginSchema } from '../schemas';

class Validation {
  // Joi validations and token decryption

  // SCHEMAS
  loginSchema;

  constructor() {
    this.loginSchema = loginSchema;
  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    const user: IUser = req.body;
    const { error } = this.loginSchema.validate(user);
    if (error) {
      if (error.message.includes('required') || error.message.includes('empty')) {
        next({ status: httpStatus.badRequest, message: messages.missingField });
      } else {
        next({ status: httpStatus.badRequest, message: error.message });
      }
    }
    next();
  };
}

export default Validation;
