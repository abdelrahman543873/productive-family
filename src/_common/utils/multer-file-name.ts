import { File } from 'fastify-multer/lib/interfaces';
import { extname } from 'path';
import { FastifyRequest } from 'fastify';
export const filename = (
  req: FastifyRequest,
  file: File,
  cb: (error: Error | null, filename: string) => void,
): void => {
  return cb(null, `${Date.now()}${extname(file.originalname)}`);
};
