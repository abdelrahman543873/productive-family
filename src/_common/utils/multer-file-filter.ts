import { File } from 'fastify-multer/lib/interfaces';

export const fileFilter = (
  req: Record<any, any>,
  file: File,
  cb: (error: Error | null, acceptFile: boolean) => void,
): void => {
  return cb(null, true);
};
