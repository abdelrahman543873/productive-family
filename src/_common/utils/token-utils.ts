import * as jwt from 'jsonwebtoken';
import { env } from './env';
import { FastifyRequest } from 'fastify';
import { ObjectID } from 'mongodb';

export const getAuthToken = (req: FastifyRequest): string => {
  if (req?.headers?.authorization || req?.headers?.Authorization) {
    let auth: string;
    if (req.headers.authorization) auth = req.headers.authorization;
    if (req.headers.Authorization) auth = <string>req.headers.Authorization;
    return auth.split(' ')[1];
  }
  return null;
};

export const generateAuthToken = (_id: ObjectID): string => {
  return jwt.sign({ _id }, env.JWT_SECRET);
};
