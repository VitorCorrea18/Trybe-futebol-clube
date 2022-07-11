import { NextFunction, Request, Response } from 'express';
import { IUser } from '../protocols';
import { httpStatus, messages } from '../utils';
import { loginSchema } from '../schemas';
import { decodeToken } from '../helpers';

class Validation {
  // Joi validations and token decryption

  // SCHEMAS
  loginSchema;
  decodeToken;

  constructor() {
    this.loginSchema = loginSchema;
    this.decodeToken = decodeToken;
  }

  public login = async (req: Request, _res: Response, next: NextFunction) => {
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
    if (typeof token === undefined) {
      next({ status: httpStatus.unauthorized, message: messages.invalidToken });
    }
    if (typeof token === 'string') {
      try {
        const { role } = this.decodeToken(token);
        return res.status(httpStatus.ok).json({ role });
      } catch (err) {
        next(err);
      }
    }
  };
}

export default Validation;
