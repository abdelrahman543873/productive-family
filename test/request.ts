import * as request from 'supertest';
import { app } from './before-test-run';
import { BaseHttpException } from '../src/shared/exceptions/base-http-exception';
import { HTTP_METHODS_ENUM } from './request.methods.enum';

export const testRequest = async (
  method: HTTP_METHODS_ENUM,
  url: string,
  variables?: Record<any, any>,
  token?: string,
  fileParam?: string,
  filePath?: string,
  fileParams?: string[],
): Promise<request.Test> => {
  const server = request(app.getHttpServer());
  let req: request.Test;
  method === HTTP_METHODS_ENUM.POST && (req = server.post(url));
  method === HTTP_METHODS_ENUM.GET && (req = server.get(url));
  method === HTTP_METHODS_ENUM.PUT && (req = server.put(url));
  method === HTTP_METHODS_ENUM.DELETE && (req = server.delete(url));
  if (!Object.values(HTTP_METHODS_ENUM).includes(method))
    throw new BaseHttpException('EN', 610);
  //only way to upload a file and send object values
  variables && filePath
    ? Object.keys(variables).forEach(key => {
        typeof variables[key] === 'string'
          ? req.field(key, variables[key])
          : req.field(key, `${variables[key]}`);
      })
    : variables;
  fileParam && filePath
    ? req.attach(fileParam, filePath)
    : fileParams
    ? null
    : req.send(variables).set('Content-Type', 'application/json');
  fileParams
    ? fileParams.forEach(param => {
        req.attach(param, filePath);
      })
    : null;
  if (token) req.set('Authorization', `Bearer ${token}`);
  return req;
};
