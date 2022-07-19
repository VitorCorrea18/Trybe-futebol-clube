import { MatchesRepository } from '../repository';
import { MatchesServices } from '../services';
import { MatchesController } from '../controllers';

const MatchesFactory = () => {
  const repository = new MatchesRepository();
  const service = new MatchesServices(repository);
  const controller = new MatchesController(service);
  return controller;
};

export default MatchesFactory;
