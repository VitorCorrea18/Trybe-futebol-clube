import { UserController } from '../controllers';
import { UserRepository } from '../repository';
import { UserService } from '../services';

const userFactory = () => {
  const repository = new UserRepository();
  const service = new UserService(repository);
  const controller = new UserController(service);
  return controller;
};

export default userFactory;
