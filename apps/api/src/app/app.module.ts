import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../../../../libs/api/auth/src/lib/auth.module';
import { UserModule } from '../../../../libs/api/user/src/lib/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/penny'),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
