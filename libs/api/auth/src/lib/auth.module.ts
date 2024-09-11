import { Injectable, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../../../user/src/lib/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [UserModule, 
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {                
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get('JWT_EXPIREIN')
          },
          global: true,
        }
    },
    inject: [ConfigService]
  })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtGuard, JwtStrategy, ConfigService],
  exports: [AuthService],
})

export class AuthModule {}
