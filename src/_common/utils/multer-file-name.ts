import { Request } from 'express';
import { File } from 'fastify-multer/lib/interfaces';
import { extname } from 'path';

export const filename = (
  req: Request,
  file: File,
  cb: (error: Error | null, filename: string) => void,
): void => {
  return cb(null, `${Date.now()}${extname(file.originalname)}`);
};
