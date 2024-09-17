import { Controller, Get, Logger, Param, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDetails } from './user-details.interface';
import { HeadersDto } from './dtos/headers.dto';
import { ReqHeader } from './pipes/req-header';

@Controller('user')
export class UserController {
    private logger = new Logger('UserController');
    
    constructor(private userService: UserService) {}

    @Get(':id')
    getUser(
        @Param('id') id: string, 
        @ReqHeader(
            new ValidationPipe({ validateCustomDecorators: true})
        ) header: HeadersDto) {

            this.logger.verbose(`User with id ${id} retrieving profile`);

            return this.userService.findById(id, header['access-token']);
    }
}
