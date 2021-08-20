import { config } from "dotenv";

export class Environment{
    constructor() {
        config();
    }

    public get PORT() : number {
        return Number(process.env.PORT) || 3000;
    }
    
    public get DB_HOST() : string {
        return process.env.MONGO_DBHOST || "localhost:27017";
    }
    
    public get DB_NAME() : string {
        return process.env.MONGO_DBNAME || "DB_TEST";
    }

    public get DB_USER() : string {
        return process.env.MONGODB_USER || "Admin";
    }
    
    public get DB_PASSWORD() : string {
        return process.env.MONGODB_PASSWORD || "Admin123"
    }
    
    public get JWT_SECRET_KEY() : string {
        return process.env.JWT_SECRET_KEY || "MY_JWT_SECRET_KEY"
    }
}