import { IMatch, IMatchModel, IMatchService } from '../protocols';
import TeamModel from '../database/models/TeamModel';
import { CustomError, httpStatus, messages } from '../utils';

export default class MatchesServices implements IMatchService {
  constructor(private model: IMatchModel) {
    this.model = model;
  }

  async getAll(): Promise<IMatch[]> {
    const result = await this.model.findAll({
      include: [
        { model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return result as IMatch[];
  }

  async getInProgress(inProgress: string): Promise<IMatch[]> {
    const result = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return result as IMatch[];
  }

  async create(payload: object): Promise<IMatch> {
    const result = await this.model.create(payload);
    return result as IMatch;
  }

  async updateGoals(id: number, matchGoals: object): Promise<number> {
    const result = await this.model.update(matchGoals, { where: { id } });
    if (!result) {
      throw new CustomError(httpStatus.notFound, messages.notFound);
    }
    return result;
  }

  async finishMatch(id: number): Promise<number> {
    const result = await this.model.update({ inProgress: false }, { where: { id } });
    return result;
  }
}
