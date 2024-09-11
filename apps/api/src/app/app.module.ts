import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../../../../libs/api/auth/src/lib/auth.module';
import { UserModule } from '../../../../libs/api/user/src/lib/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING), // local DB for now
                                                                   // todo: connect to Atlas
    UserModule,
    AuthModule,
    ConfigModule.forRoot(
      {
        isGlobal: true,
      }
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
