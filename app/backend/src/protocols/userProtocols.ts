export interface IUser {
  id?: number;
  username?: string;
  role?: string;
  email: string;
  password: string;
}

export interface IUserService {
  login(data: object): Promise<object>
}

export interface IUserModel {
  findOne(data: object): Promise<IUser>
}
