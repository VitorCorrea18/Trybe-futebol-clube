import { NextFunction, Request, Response } from 'express';
import { httpStatus } from '../utils';
import { ILeaderBoardService } from '../protocols';

export default class LeaderBoardController {
  constructor(private service: ILeaderBoardService) {
    this.service = service;
  }

  async getLeaderBoardHome(_req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.service.getLeaderBoardHome();
      return res.status(httpStatus.ok).json(result);
    } catch (err) {
      next(err);
    }
  }
}
