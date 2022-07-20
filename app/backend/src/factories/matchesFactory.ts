import { MatchesRepository, TeamRepository } from '../repository';
import { MatchesServices } from '../services';
import { MatchesController } from '../controllers';

const MatchesFactory = () => {
  const teamRepository = new TeamRepository();
  const Matchrepository = new MatchesRepository();
  const service = new MatchesServices(Matchrepository, teamRepository);
  const controller = new MatchesController(service);
  return controller;
};

export default MatchesFactory;
