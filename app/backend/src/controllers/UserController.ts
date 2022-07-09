import { NextFunction, Request, Response } from 'express';
import { IUserService } from '../protocols/index';
import { httpStatus } from '../utils';

export default class UserController {
  constructor(private service: IUserService) {
    this.service = service;
  }

  async login(req:Request, res: Response, next:NextFunction) {
    try {
      const result = await this.service.login(req.body);
      return res.status(httpStatus.ok).json(result);
    } catch (err) {
      next(err);
    }
  }
}
