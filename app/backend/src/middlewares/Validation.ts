import { NextFunction, Request, Response } from 'express';
import { IUser } from '../protocols';
import { httpStatus, messages } from '../utils';
import { loginSchema, tokenSchema } from '../schemas';

class Validation {
  // Joi validations and token decryption

  // SCHEMAS
  loginSchema;
  tokenSchema;

  constructor() {
    this.loginSchema = loginSchema;
    this.tokenSchema = tokenSchema;
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

  public token = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    const { error } = this.tokenSchema.validate(token);
    if (error) {
      next({ status: httpStatus.unauthorized, message: messages.invalidToken });
    }
    next();
  };
}

export default Validation;
