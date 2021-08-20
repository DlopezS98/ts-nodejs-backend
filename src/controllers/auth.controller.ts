import { Request, Response } from "express";
import { IUsers, IUserDocument } from "../models/security/users.model";
import UserModel from "../schemas/security/users.schema";
import { HttpStatusCodes } from "../models/constants/status.codes"
import { HttpResponse } from "../models/http.response";

export class AuthController{
    private userBody!: IUsers;

    public async SignUp(req: Request, res: Response): Promise<Response> {
        try {
            this.userBody = req.body as IUsers;
            if(!this.userBody.userName || !this.userBody.email || !this.userBody.password)
                return res.status(HttpStatusCodes.BadRequest).json(new HttpResponse({ message: "Please send the username, email and password, these fields are required" }));
            
            let exists: boolean = await UserModel.VerifyIfUserExists(this.userBody);
            if(exists) return res.status(HttpStatusCodes.BadRequest).json(new HttpResponse({ message: "The user already exists! username & email must be unique" }));
    
            const user: IUserDocument = new UserModel(this.userBody);
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
        return res.send('SignIn Works!');
    }
}