import { env } from '../utils/env';

export class ConfigService {
  private readonly envConfig: Record<string, string>;

  public async getMongoConfig(): Promise<Record<string, unknown>> {
    return {
      uri: env.MONGO_DB,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };
  }
}
