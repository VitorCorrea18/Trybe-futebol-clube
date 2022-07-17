import TeamModel from '../database/models/TeamModel';
import { ITeam, ITeamModel } from '../protocols';

export default class UserRepository implements ITeamModel {
  constructor(private model = TeamModel) {
    this.model = model;
  }

  async findOne(id: number): Promise<ITeam> {
    const result = await this.model.findOne({ where: { id } });
    return result as ITeam;
  }

  async findAll(): Promise<ITeam[]> {
    const result = await this.model.findAll();
    return result as ITeam[];
  }
}
