import express, { Express, urlencoded, json, Request, Response } from "express";
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";

config();
const app: Express = express();

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(urlencoded({extended: false}));
app.use(json());

app.get('/', (req: Request, res: Response) => { 
    res.send('Hello World!!!');
});

 export default app;