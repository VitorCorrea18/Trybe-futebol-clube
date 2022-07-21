import { IUser, IUserModel, IUserService, IUserWithoutPass } from './userProtocols';
import { ITeam, ITeamModel, ITeamService } from './teamProtocols';
import { IMatch, IMatchModel, IMatchService } from './matchesProtocols';
import { ILeaderBoardService, ITeamBoard, ITeamMatches, IMatchGoals } from './leaderBoardProtocols';

export { default as IError } from './errorProtocol';

export {
  IUser,
  IUserModel,
  IUserService,
  IUserWithoutPass,
  ITeam,
  ITeamModel,
  ITeamService,
  IMatch,
  IMatchModel,
  IMatchService,
  ILeaderBoardService,
  ITeamBoard,
  ITeamMatches,
  IMatchGoals,
};
