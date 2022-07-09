import * as jwt from 'jsonwebtoken';
import { IUser } from '../protocols';

const jwtSecret:string = process.env.JWT_SECRET || 'jwt_secret';
const jwtConfig:jwt.SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const genToken = (payload: IUser) => {
  const token = jwt.sign({ data: payload }, jwtSecret, jwtConfig);
  return { token };
};

export default genToken;
