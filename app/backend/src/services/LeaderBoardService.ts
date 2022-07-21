import MatchModel from '../database/models/MatchModel';
import { ILeaderBoardService, IMatchModel, ITeamModel, ITeamMatches } from '../protocols';
import { buildBoard, sortTeams } from '../helpers';

export default class LeaderBoardService implements ILeaderBoardService {
  constructor(private teamModel: ITeamModel, private matchModel: IMatchModel) {
    this.teamModel = teamModel;
    this.matchModel = matchModel;
  }

  async getLeaderBoardHome(): Promise<object> {
    const teamsMatches = await this.teamModel.findAllMatches({
      include: {
        model: MatchModel,
        as: 'teamHome',
        attributes: { exclude: ['id', 'homeTeam', 'awayTeam', 'inProgress'] },
        where: { inProgress: false },
      },
      attributes: { exclude: ['id'] },
    }) as ITeamMatches[];
    const teamsBoard = buildBoard(teamsMatches);
    const sortedTeams = sortTeams(teamsBoard);

    return sortedTeams;
  }
}
