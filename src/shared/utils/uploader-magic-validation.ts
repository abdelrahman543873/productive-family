import file_type from 'file-type';
import fs from 'fs';
import { BaseHttpException } from '../exceptions/base-http-exception';

export const fileValidation = async (
  files?: Array<Express.Multer.File>,
  file?: Express.Multer.File,
): Promise<void> => {
  // a security measure that allows checking the file type by the magic number and not only by the file name extension
  // have a look here
  // https://www.npmjs.com/package/file-type
  const imgExt = [
    'jpg',
    'png',
    'gif',
    'webp',
    'tiff',
    'psd',
    'raw',
    'bmp',
    'heif',
    'indd',
    'pdf',
    'svg',
    'jpeg',
  ];
  if (files) {
    Object.keys(files).forEach(async file => {
      const fileType = await file_type.fromFile(files[file][0].path);
      if (!imgExt.includes(fileType.ext)) {
        await fs.unlinkSync(files[file][0].path);
        throw new BaseHttpException('EN', 609);
      }
    });
  }
  if (file) {
    const fileType = await file_type.fromFile(file.path);
    if (!imgExt.includes(fileType.ext)) {
      await fs.unlinkSync(file.path);
      throw new BaseHttpException('EN', 609);
    }
  }
};
