import { compare, genSalt, hash } from "bcrypt";
import { Types, Document, Model, CallbackError } from "mongoose";

export interface IUsers {
    userName: string;
    email: string;
    password: string;
    deleted: boolean;
}

export interface IUserDocument extends IUsers, Document {
    // EncriptPassword(password: string): Promise<string>;
    MatchPassword(password: string): Promise<boolean>;
    GetMessage(message: string): string;
}

//For Model // you can define your statics methods here!
export interface IUserModel extends Model<IUserDocument>{
    SayHelloWorld(): string;
    VerifyIfUserExists(this: IUserModel, user: IUsers): Promise<boolean>;
}

// Customs Methods for the Schema
export async function EncriptPassword(password: string): Promise<string> {
    const salt: string = await genSalt(10);
    return await hash(password, salt);
}

export async function MatchPassword(this: IUserDocument, password: string): Promise<boolean> {
    return await compare(password, this.password);
}

export function GetMessage(message: string): string{
    return message +" | "+ "DlopezS98";
}

//Static methods
export function SayHelloWorld(): string{
    return "Hello World!";
}

export async function VerifyIfUserExists(this: IUserModel, user: IUsers): Promise<boolean>{
    let userdoc: IUserDocument | null;
    const model: IUserModel = this;
    userdoc = await model.findOne({ $or: [{ email: user.email }, {userName: user.userName}], $and: [{ deleted: false }] });
    if(userdoc)
        return true;

    return false;
}