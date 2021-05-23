import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import file_type from 'file-type';
import fs from 'fs';
import { BaseHttpException } from '../exceptions/base-http-exception';

@Injectable()
export class FileValidationInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
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
    if (request.files) {
      const paths = Object.keys(request.files).map(file => {
        return request.files[file][0].path;
      });
      let error = false;
      for (let i = 0; i < paths.length; i++) {
        const fileType = await file_type.fromFile(paths[i]);
        if (!fileType || !imgExt.includes(fileType.ext)) {
          fs.unlinkSync(paths[i]);
          error = true;
        }
      }
      if (error) throw new BaseHttpException('EN', 606);
    }
    if (request.file) {
      const fileType = await file_type.fromFile(request.file.path);
      if (!fileType || !imgExt.includes(fileType.ext)) {
        await fs.unlinkSync(request.file.path);
        throw new BaseHttpException('EN', 606);
      }
    }
    return next.handle();
  }
}
