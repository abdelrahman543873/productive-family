import { Injectable } from '@nestjs/common';

@Injectable()
export class FaqService {
  async getFaq(): Promise<string> {
    return 'hello';
  }
}
