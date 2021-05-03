import * as dotenv from 'dotenv';
import * as AWS from 'aws-sdk';

export class ConfigService {
  private readonly envConfig: Record<string, string>;
  private readAWSConfig: boolean;
  private region = '';
  private secretName = '';

  constructor() {
    const result = dotenv.config();
    if (result.error) this.envConfig = process.env;
    else this.envConfig = process.env;

    if (this.envConfig.AWS_ACTIVE == 'true') {
      this.readAWSConfig = true;
      this.region = this.get('REGION');
      this.secretName = this.get('MONGO_DB');
    } else this.readAWSConfig = false;
  }

  public get(key: string): string {
    return this.envConfig[key];
  }

  public async getMongoConfig() {
    if (this.readAWSConfig) await this.upAWSConfig();
    return {
      uri:
        'mongodb://bodi:Vindiesel33$@cluster0-shard-00-00.dd7up.mongodb.net:27017,cluster0-shard-00-01.dd7up.mongodb.net:27017,cluster0-shard-00-02.dd7up.mongodb.net:27017/test?replicaSet=atlas-nls3wr-shard-0&ssl=true&authSource=admin',
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };
  }

  public async upAWSConfig() {
    let error;
    const client = new AWS.SecretsManager({
      region: this.region,
    });

    const secrets = await client
      .getSecretValue({ SecretId: this.secretName })
      .promise()
      .catch(err => (error = err));

    if (error) {
      if (error.code === 'DecryptionFailureException') {
        // Secret Manager can't decrypt the protected secret text using the provided KMS Key
        // Deal with the exception here and/or rethrow at your discretion
        throw error;
      } else if (error.code === 'InternalServiceErrorException') {
        // An error occurred on the server side
        // Deal with the exception here , and/or rethrow at your discretion
        throw error;
      } else if (error.code === 'InvalidParamterException') {
        // you provided an invalid paramter
        // Deal with the exception here , and/or rethrow at your discretion
        throw error;
      } else if (error.code === 'InvalidRequestException') {
        // you provider a paramter value that isn't valid for the current state of resource
        // Deal with the exception here , and/or rethrow at your discretion
        throw error;
      } else if (error.code === 'ResourceNotFoundException') {
        // We can't find the resource that you asked for.
        // Deal with the exception here , and/or rethrow at your discretion
        throw error;
      }
    }

    this.readAWSConfig = false;

    const resultSecrets = JSON.parse(secrets.SecretString);
    for (const key in resultSecrets) {
      this.envConfig[key] = resultSecrets[key];
    }
  }
}
