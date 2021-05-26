import { FastifyRequest } from 'fastify';
import { LangEnum } from './app.enum';
export interface RequestContext {
  currentUser?: Record<any, any>;
  appContext: FastifyRequest;
  lang: LangEnum | string;
  long?: number;
  lat?: number;
}
