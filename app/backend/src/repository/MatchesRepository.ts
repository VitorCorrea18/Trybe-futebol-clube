import MatchModel from '../database/models/MatchModel';
import { IMatch, IMatchModel } from '../protocols';

export default class MatchesRepository implements IMatchModel {
  constructor(private model = MatchModel) {
    this.model = model;
  }

  async findAll(): Promise<IMatch[]> {
    const result = await this.model.findAll();
    return result as IMatch[];
  }

  async findInProgress(inProgress: boolean): Promise<IMatch[]> {
    const result = await this.model.findAll({ where: { inProgress } });
    return result as IMatch[];
  }

  async findOne(id: number): Promise<IMatch> {
    const result = await this.model.findOne({ where: { id } });
    return result as IMatch;
  }
}
