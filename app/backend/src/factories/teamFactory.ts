import { TeamController } from '../controllers';
import { TeamRepository } from '../repository';
import { TeamService } from '../services';

const teamFactory = () => {
  const repository = new TeamRepository();
  const service = new TeamService(repository);
  const controller = new TeamController(service);
  return controller;
};

export default teamFactory;
