import { IMatch, IMatchModel, IMatchService, ITeamModel } from '../protocols';
import TeamModel from '../database/models/TeamModel';
import { CustomError, httpStatus, messages } from '../utils';

export default class MatchesServices implements IMatchService {
  constructor(private model: IMatchModel, private teamModel: ITeamModel) {
    this.model = model;
    this.teamModel = teamModel;
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

  async getByProgress(inProgress: string): Promise<IMatch[]> {
    console.log(inProgress);
    const result = await this.model.findAll({
      where: { inProgress: inProgress === 'true' },
      include: [
        { model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return result as IMatch[];
  }

  async create(payload: IMatch): Promise<IMatch> {
    // validate teams
    const homeTeam = await this.teamModel.findOne(payload.homeTeam);
    const awayTeam = await this.teamModel.findOne(payload.awayTeam);
    if (!homeTeam || !awayTeam) {
      throw new CustomError(httpStatus.badRequest, messages.invalidTeam);
    }
    if (homeTeam.id === awayTeam.id) {
      throw new CustomError(httpStatus.unauthorized, messages.equalTeams);
    }
    const result = await this.model.create(payload);
    return result as IMatch;
  }

  async updateGoals(id: number, matchGoals: object): Promise<void> {
    const result = await this.model.update(matchGoals, { where: { id } });
    if (!result) {
      throw new CustomError(httpStatus.notFound, messages.notFound);
    }
  }

  async finishMatch(id: number): Promise<number> {
    const result = await this.model.update({ inProgress: false }, { where: { id } });
    return result;
  }
}
