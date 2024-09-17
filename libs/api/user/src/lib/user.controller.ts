import { Controller, Get, Headers, Param, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDetails } from './user-details.interface';
import { HeadersDto } from './dtos/headers.dto';
import { ReqHeader } from './pipes/req-header';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get(':id')
    getUser(
        @Param('id') id: string, 
        @ReqHeader(
            new ValidationPipe({ validateCustomDecorators: true})
        ) header: HeadersDto) {
            return this.userService.findById(id, header['access-token']);
    }

    // add logout and expire token in the SB
}
