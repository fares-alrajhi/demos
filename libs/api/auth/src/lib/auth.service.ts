import { Injectable } from '@nestjs/common';
import { UserService } from '../../../user/src/lib/user.service';
import * as bcrypt from 'bcrypt';
import { NewUserDTO } from '../../../user/src/lib/dtos/new-user.dto';
import { UserDetails } from '../../../user/src/lib/user-details.interface';
import { ExistingUserDTO } from '../../../user/src/lib/dtos/existing-user.dto';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (private userService: UserService, private jwtService: JwtService) {}

    async register(user: Readonly<NewUserDTO>): Promise<UserDetails | any> {
        const { name, email, password } = user;
        const existingUser = await this.userService.findByEmail(email);

        if(existingUser) {
            return 'This email already exist';
        }

        const hashPassword = await this.hashPassword(password);
        const newUser = await this.userService.create(name, email, hashPassword);

        return this.userService._getUserDetails(newUser);
    }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12);
    }

    async doesPasswordMatch(password: string, hashPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashPassword);
    }

    async validateUser(email: string, password: string): Promise<UserDetails | null> {
        const user = await this.userService.findByEmail(email);
        const userExist = !!user;

        if(!userExist) { return null; }

        const passwordMatch = await this.doesPasswordMatch(password, user.password);

        if(!passwordMatch) { return null; }

        return this.userService._getUserDetails(user);
    }

    async login(existingUser: ExistingUserDTO): Promise<{token: string} | string> {
        const { email, password } = existingUser;
        
        const user = await this.validateUser(email, password);
        const jwt = await this.jwtService.signAsync({ user });

        if(!user) {return 'email or password does not match'}

        return {token: jwt};
    }
}
