import { Request, Response } from "express";
import { IUsers, IUserDocument } from "../models/security/users.model";
import UserModel from "../schemas/security/users.schema";
import { HttpStatusCodes } from "../models/constants/status.codes"
import { HttpResponse } from "../models/http.response";
import Jwt from "jsonwebtoken";
import { Environment } from "../config/enviroment";

export class AuthController{
    constructor(){
    }

    public async SignUp(req: Request, res: Response): Promise<Response> {
        try {
            let userBody = req.body as IUsers;
            if(!userBody.userName || !userBody.email || !userBody.password)
                return res.status(HttpStatusCodes.BadRequest).json(new HttpResponse({ message: "Please send the username, email and password, these fields are required" }));
            
            let exists: boolean = await UserModel.VerifyIfUserExists(userBody);
            if(exists) return res.status(HttpStatusCodes.BadRequest).json(new HttpResponse({ message: "The user already exists! username & email must be unique" }));
    
            const user: IUserDocument = new UserModel(userBody);
            await user.save();
    
            return res.status(HttpStatusCodes.Ok).json(new HttpResponse({   statusCode: HttpStatusCodes.Ok, 
                                                                            message: "User created successfully!", 
                                                                            success: true, options: { user } 
                                                                        }));
        } catch (_error) {
            let error = new HttpResponse({ message: _error.message, options: { error: _error } });
            return res.status(HttpStatusCodes.BadRequest).json(error);
        }
    }

    public async SignIn(req: Request, res: Response): Promise<Response>{
        let ctrl = new AuthController();
        let data = req.body;
        if(!data.userName || !data.password){
            return res.status(HttpStatusCodes.BadRequest).json(new HttpResponse({ message: "Please send the email or username and password" }));
        }

        const user: IUserDocument | null = await UserModel.findOne({ $or: [{ userName: data.userName }, { email: data.userName }] });
        if(!user)
            return res.status(HttpStatusCodes.BadRequest).json(new HttpResponse({ message: "The username or the email doesn't exists" }));
        
        if(user.deleted)
            return res.status(HttpStatusCodes.Unauthorized).json(new HttpResponse({ statusCode: HttpStatusCodes.Unauthorized, 
                                                                                    message: "The account has been disabled, please contact the system admin!" 
                                                                                }));
        let matchPassword: boolean = await user.MatchPassword(data.password);
        if(!matchPassword)
            return res.status(HttpStatusCodes.BadRequest).json(new HttpResponse({ message: "The password is wrong!" }));

        let token: string = ctrl.GenerateUsersToken(user);
        let httpResponse = new HttpResponse({ 
            statusCode: HttpStatusCodes.Ok,
            message: "You're logged in successfully!",
            success: true,
            options: { 
                userName: user.userName,
                email: user.email,
                token: token,
                expiresIn: "2h"
            }
        });
        return res.status(HttpStatusCodes.Ok).json(httpResponse);
    }

    private GenerateUsersToken(user: IUserDocument): string {
        let env: Environment = new Environment();
        let token: string = Jwt.sign({ id: user._id, email: user.email, userName: user.userName }, env.JWT_SECRET_KEY, {
            expiresIn: "2h",
        });
        return token;
    }
}