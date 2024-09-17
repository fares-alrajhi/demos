import { BadRequestException, ForbiddenException, Injectable, } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { UserService } from '../../../user/src/lib/user.service';
import { hash, verify } from 'argon2';
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
        const result = {
            status: '',
            error: false,
            user: {},
        }

        if(existingUser) {
            result.status = "conflict";
            result.error = true;

            return result;
        }

        const hashPassword = await this.hashPassword(password);
        const newUser = await this.userService.create(name, email, hashPassword);

        result.status = "ok";
        result.user = this.userService._getUserDetails(newUser);
        result.error = false;

        return result;
    }

    async hashPassword(password: string): Promise<string> {
        return hash(password);
    }

    async doesPasswordMatch(hashPassword: string, password: string): Promise<boolean> {
        return verify(hashPassword, password);
    }

    async validateUser(email: string, password: string): Promise<UserDetails | null> {
        const user = await this.userService.findByEmail(email);
        const userExist = !!user;

        if(!userExist) { return null; }

        const passwordMatch = await this.doesPasswordMatch(user.password, password);

        if(!passwordMatch) { return null; }

        return this.userService._getUserDetails(user);
    }

    async login(existingUser: ExistingUserDTO): Promise<{status: string, error: boolean, token: string}> {
        const { email, password } = existingUser;
        const result = {
            status: '',
            error: false,
            token: '',
            name: '',
            userId: '',
        }
        
        const user = await this.validateUser(email, password);
        const jwt = await this.jwtService.signAsync({ user });

        if(!user) {
            result.error = true;
            result.status= 'unauthorized';
        }
        else {
            result.status= 'ok'; 
            result.token= jwt;
            result.name = user.name;
            result.userId = user.id;

            const tokenExist = await this.userService.retrieveToken(user.id);
            if(!tokenExist){
                this.userService.storeToken(user.id, jwt);
            }
            
        }

        return result;
    }

    async logout(userId: string): Promise<{status: string, error: boolean}> {

        const result = {
            status: '',
            error: false,
        }
        
        const logoutUser = await this.userService.invalidateToken(userId);

        if(logoutUser){
            result.status = "User logged out is completed";
        }
        else {
            result.status = "Bad Request";
            result.error = true;
        }

        return result;
    }
}
