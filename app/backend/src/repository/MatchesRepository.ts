import MatchModel from '../database/models/MatchModel';
import { IMatch, IMatchModel } from '../protocols';

type data = { where: object };

export default class MatchesRepository implements IMatchModel {
  constructor(private model = MatchModel) {
    this.model = model;
  }

  async findAll(data: object): Promise<IMatch[]> {
    const result = await this.model.findAll(data);
    return result as IMatch[];
  }

  async findAllInProgress(data: object): Promise<IMatch[]> {
    const result = await this.model.findAll(data);
    return result as IMatch[];
  }

  async create(payload:object): Promise<IMatch> {
    const result = await this.model.create({ ...payload, inProgress: true });
    return result;
  }

  async update(payload: object, data: data): Promise<number> {
    const [result] = await this.model.update(payload, data);
    return result;
  }
}
