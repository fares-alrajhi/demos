import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TokenDocument, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { UserDetails } from './user-details.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: 
        Model<UserDocument>,
        @InjectModel('Token') private readonly tokenModel: 
        Model<TokenDocument>
    ) {}

    _getUserDetails(user: UserDocument): UserDetails {
        return {
            id: user.id,
            name: user.name,
            email: user.email
        };
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({email}).exec()
    }

    async findById(id: string, accessToken: string): Promise<UserDetails | null | {}> {
        const user = await this.userModel.findById(id).exec();
       
        const storedToken = await this.retrieveToken(id);

        if(!user) {
            return null;
        }
        else if(storedToken != accessToken) {
            return {
                error: true,
                error_text: 'This user is not authorized'
            }
        }

        return this._getUserDetails(user);
    }

    async create(
        name: string, 
        email: string, 
        hashedPassword: string
    ): Promise<UserDocument> {
        const newUser = new this.userModel({
            name,
            email,
            password: hashedPassword,
        });
        return newUser.save();
    }

    async storeToken(
        userId: string, 
        token: string,
    ): Promise<TokenDocument> {
        const newToken = new this.tokenModel({
            userId,
            token,
        });
        return newToken.save();
    }

    async retrieveToken(userId: string): Promise< string | null> {
        const user = await this.tokenModel.findOne({'userId': userId});
        
        if(!user?.token) {
            return null;
        }

        return user.token;
    }

    async invalidateToken(userId: string): Promise< {} | null> {
        const deleted = await this.tokenModel.findOneAndDelete({ userId: userId } );

        return deleted;
    }
}
