import { Environment } from "../config/enviroment";
import { IUserDocument } from "models/security/users.model";
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import UserModel from "../schemas/security/users.schema";

const env: Environment = new Environment();
const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.JWT_SECRET_KEY
};

export default new Strategy(options, async (payload, done) => {
    const user: IUserDocument | null = await UserModel.findById(payload.id);
    if(user)
        return done(null, user);
    return done(null, false);
});