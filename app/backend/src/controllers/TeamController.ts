import { NextFunction, Request, Response } from 'express';
import { httpStatus } from '../utils';
import { ITeamService } from '../protocols';

export default class TeamController {
  constructor(private service: ITeamService) {
    this.service = service;
  }

  async getById(req:Request, res: Response, next:NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.service.getById(Number(id));
      return res.status(httpStatus.ok).json(result);
    } catch (err) {
      next(err);
    }
  }

  async getAll(_req:Request, res: Response, next:NextFunction) {
    try {
      const result = await this.service.getAll();
      return res.status(httpStatus.ok).json(result);
    } catch (err) {
      next(err);
    }
  }
}
