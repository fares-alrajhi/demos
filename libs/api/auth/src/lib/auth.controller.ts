import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NewUserDTO } from '../../../user/src/lib/dtos/new-user.dto';
import { UserDetails } from '../../../user/src/lib/user-details.interface';
import { ExistingUserDTO } from '../../../user/src/lib/dtos/existing-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    register(@Body() user: NewUserDTO): Promise<UserDetails | null> {
        return this.authService.register(user);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() user: ExistingUserDTO): Promise<{token: string} | string> {
        return this.authService.login(user);
    }
}
