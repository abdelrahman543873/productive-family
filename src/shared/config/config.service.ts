import * as dotenv from 'dotenv';

export class ConfigService {
  private readonly envConfig: Record<string, string>;
  constructor() {
    dotenv.config();
  }

  public async getMongoConfig(): Promise<Record<string, unknown>> {
    return {
      uri: process.env.MONGO_DB,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };
  }
}
