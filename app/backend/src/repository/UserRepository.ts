import UserModel from '../database/models/UserModel';
import { IUser, IUserModel } from '../protocols';

export default class UserRepository implements IUserModel {
  constructor(private model = UserModel) {
    this.model = model;
  }

  async findOne(data: IUser): Promise<IUser> {
    const result = await this.model.findOne({ where: { email: data.email } });
    return result as IUser;
  }
}
