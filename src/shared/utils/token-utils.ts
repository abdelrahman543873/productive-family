import * as jwt from 'jsonwebtoken';
import { Request } from 'express';
import { env } from '../utils/env';

export const getAuthToken = (req: Request): string => {
  if (
    req &&
    req.headers &&
    (req.headers.authorization || req.headers.Authorization)
  ) {
    let auth: string;
    if (req.headers.authorization) auth = req.headers.authorization;
    if (req.headers.Authorization) auth = <string>req.headers.Authorization;
    return auth.split(' ')[1];
  }
  return null;
};

export const generateAuthToken = (_id: string): string => {
  return jwt.sign({ _id }, env.JWT_SECRET);
};
