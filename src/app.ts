import express, { Express, urlencoded, json, Request, Response } from "express";
import { Environment } from "./config/enviroment";
import morgan from "morgan";
import cors from "cors";

let env: Environment = new Environment();

const app: Express = express();
//settings
app.set('port', env.PORT);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(urlencoded({extended: false}));
app.use(json());

//Routes
app.get('/', (req: Request, res: Response) => { 
    res.send('Hello World!!!');
});

 export default app;