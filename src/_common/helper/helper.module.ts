import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/models/user.schema';
import { HelperService } from './helper.service';
import { Driver, DriverSchema } from '../../driver/models/driver.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Driver.name, schema: DriverSchema },
    ]),
  ],
  providers: [HelperService],
  exports: [HelperService],
})
export class HelperModule {}
