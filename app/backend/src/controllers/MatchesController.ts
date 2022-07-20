import { NextFunction, Request, Response } from 'express';
import { httpStatus, messages } from '../utils';
import { IMatchService } from '../protocols';

export default class MatchesController {
  constructor(private service: IMatchService) {
    this.service = service;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body.inProgress) { // pass the value inProgress from query to body on validation before the controller
        const { inProgress } = req.body;
        const result = await this.service.getByProgress(inProgress);
        return res.status(httpStatus.ok).json(result);
      }

      const result = await this.service.getAll();
      return res.status(httpStatus.ok).json(result);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;
      const result = await this.service.create(payload);
      return res.status(httpStatus.created).json(result);
    } catch (err) {
      next(err);
    }
  }

  async updateGoals(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;
      const { id } = req.params;
      await this.service.updateGoals(Number(id), payload);
      return res.status(httpStatus.ok).end();
    } catch (err) {
      next(err);
    }
  }

  async finishMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.service.finishMatch(Number(id));
      return res.status(httpStatus.ok).json({ message: messages.finished });
    } catch (err) {
      next(err);
    }
  }
}
