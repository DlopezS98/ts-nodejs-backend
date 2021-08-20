import { connect } from "mongoose";
import { Environment } from "./config/enviroment"

let env: Environment = new Environment();
const { DB_HOST, DB_NAME } = env;
const MONGODB_URI = `mongodb://${DB_HOST}/${DB_NAME}`;

export class DataBase {
    async CreateDbConnection(): Promise<void> {
        try {
            await connect(MONGODB_URI, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true,
            });
            console.log("Database connected on:", DB_HOST);
        } catch (error) {
            console.log("An error ocurred while connecting to DB:", error);
        }
    }
}
