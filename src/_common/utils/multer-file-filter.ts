import { File } from 'fastify-multer/lib/interfaces';
import { FastifyRequest } from 'fastify';

export const fileFilter = (
  req: FastifyRequest,
  file: File,
  cb: (error: Error | null, acceptFile: boolean) => void,
): void => {
  return cb(null, true);
};
