import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenSchema, UserSchema } from './user.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {name: 'User', schema: UserSchema},
    {name: 'Token', schema: TokenSchema}
  ])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
