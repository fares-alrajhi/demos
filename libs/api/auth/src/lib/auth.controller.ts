import { Controller, Post, Body, HttpCode, HttpStatus, Res, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NewUserDTO } from '../../../user/src/lib/dtos/new-user.dto';
import { UserDetails } from '../../../user/src/lib/user-details.interface';
import { ExistingUserDTO } from '../../../user/src/lib/dtos/existing-user.dto';
import { Response } from 'express';
import { error } from 'console';
import { get } from 'http';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    register(@Body() user: NewUserDTO): Promise<UserDetails | null> {
        return this.authService.register(user).catch(err => {
            return err;
        });
    }

    @Post('login')
    login(@Body() user: ExistingUserDTO, @Res({ passthrough: true }) res: Response): Promise<{token: string} | object> {
        return this.authService.login(user).catch(err => {
            return err;
        });
    }

    @Get('logout/:id')
    logout(
        @Param('id') id: string) {                
            return this.authService.logout(id).catch((err: any) => {
                return err;
            });
    }
}
