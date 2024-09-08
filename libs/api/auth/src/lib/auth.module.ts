import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../../../user/src/lib/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';

@Module({
  imports: [UserModule, JwtModule.registerAsync({
    useFactory: () => ({
      global: true,
      secret: 'secret',
      signOptions: {expiresIn: '8h'} // expire token in 8 hours and force re-login
  })})],
  controllers: [AuthController],
  providers: [AuthService, JwtGuard, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
