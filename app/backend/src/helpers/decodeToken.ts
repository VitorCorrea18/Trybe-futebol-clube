import * as jwt from 'jsonwebtoken';
import { httpStatus, messages, CustomError } from '../utils';

const jwtSecret:string = process.env.JWT_SECRET || 'jwt_secret';

// https://github.com/tryber/sd-017-trybe-futebol-clube/pull/56/commits/f2bccc32b793951e8bd381467234e2cdc2318bd6
interface IDecode {
  data: {
    dataValues: {
      id: number,
      userName: string,
      role: string,
      email: string,
    }
  }
  iat: number;
  exp: number;
}

const decodeToken = (token:string) => {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const { data } = decoded as IDecode;
    return data.dataValues;
  } catch (err) {
    throw new CustomError(httpStatus.unauthorized, messages.invalidToken);
  }
};

export default decodeToken;
