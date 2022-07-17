import { ITeam, ITeamModel, ITeamService } from '../protocols';
import { CustomError, httpStatus, messages } from '../utils';

export default class TeamService implements ITeamService {
  constructor(private model: ITeamModel) {
    this.model = model;
  }

  async getAll(): Promise<ITeam[]> {
    const result = this.model.findAll();
    return result;
  }

  async getById(id: number): Promise<ITeam> {
    const result = await this.model.findOne(id);
    if (!result) {
      throw new CustomError(httpStatus.notFound, messages.notFound);
    }
    return result;
  }
}
