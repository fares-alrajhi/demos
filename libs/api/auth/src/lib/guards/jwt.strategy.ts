import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Request as RequestType } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.extractJWT,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET')
        })
    }
    
    async validate(payload: any) {
        return {
            ...payload.user
        };
    }

    private static extractJWT(req: RequestType): string | null {
        if(
            req.cookies &&
            'token' in req.cookies && 
            req.cookies.token.length > 0
        ) {
            return req.cookies.token;
        }

        return null;
    }
}