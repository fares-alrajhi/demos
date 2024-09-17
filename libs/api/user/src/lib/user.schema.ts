import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type UserDocument = User & Document;
export type TokenDocument = Token & Document;

@Schema()
export class User {
    @Prop({ required: true })
    name!: string;

    @Prop({ required: true, unique: true })
    email!: string;

    @Prop({ required: true })
    password!: string;
}

@Schema()
export class Token {
    @Prop({ required: true, unique: true })
    userId!: string;

    @Prop({ required: true })
    token!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export const TokenSchema = SchemaFactory.createForClass(Token);