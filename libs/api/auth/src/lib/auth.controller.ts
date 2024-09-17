import { Controller, Post, Body, HttpCode, HttpStatus, Res, Get, Param, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NewUserDTO } from '../../../user/src/lib/dtos/new-user.dto';
import { UserDetails } from '../../../user/src/lib/user-details.interface';
import { ExistingUserDTO } from '../../../user/src/lib/dtos/existing-user.dto';
import { Response } from 'express';
import { error } from 'console';
import { get } from 'http';

@Controller('auth')
export class AuthController {
    private logger = new Logger('AuthController')
    constructor(private authService: AuthService) {}

    @Post('register')
    register(@Body() user: NewUserDTO): Promise<UserDetails | null> {
        this.logger.verbose(`User ${user.name} with email ${user.email} registering, Filters: ${JSON.stringify(NewUserDTO)}`);
        return this.authService.register(user).catch(err => {
            return err;
        });
    }

    @Post('login')
    login(@Body() user: ExistingUserDTO, @Res({ passthrough: true }) res: Response): Promise<{token: string} | object> {
        this.logger.verbose(`User email ${user.email} logging in, Filters: ${JSON.stringify(ExistingUserDTO)}`);

        return this.authService.login(user).catch(err => {
            return err;
        });
    }

    @Get('logout/:id')
    logout(
        @Param('id') id: string) {    
            this.logger.verbose(`User with id ${id} logging out`);
            
            return this.authService.logout(id).catch((err: any) => {
                return err;
            });
    }
}
