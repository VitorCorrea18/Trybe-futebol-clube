import { MatchesRepository, TeamRepository } from '../repository';
import { LeaderBoardController } from '../controllers';
import { LeaderBoardService } from '../services';

const leaderBoardFactory = () => {
  const teamRepository = new TeamRepository();
  const matchesRepository = new MatchesRepository();
  const service = new LeaderBoardService(teamRepository, matchesRepository);
  const controller = new LeaderBoardController(service);
  return controller;
};

export default leaderBoardFactory;
