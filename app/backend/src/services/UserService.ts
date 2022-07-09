import * as bcrypt from 'bcryptjs';
import { IUserService, IUserModel, IUser } from '../protocols';
import { CustomError, httpStatus, messages } from '../utils';
import { genToken } from '../helpers';

export default class UserService implements IUserService {
  constructor(private model: IUserModel) {
    this.model = model;
  }

  async login(data: IUser): Promise<object> {
    const user = await this.model.findOne(data); // check if user exists
    if (!user) {
      throw new CustomError(httpStatus.unauthorized, messages.failedLogin);
    }
    const validatePW = await bcrypt.compare(data.password, user.password); // validate user password
    if (!validatePW || data.email !== user.email) {
      throw new CustomError(httpStatus.unauthorized, messages.failedLogin);
    }

    const { password: passDB, ...userWithoutPass } = user;
    const token = genToken(userWithoutPass); // genToken returns an obj with key token
    return token;
  }
}
