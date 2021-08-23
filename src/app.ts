import express, { Express, urlencoded, json, Request, Response } from "express";
import { Environment } from "./config/enviroment";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import notesRoutes from "./routes/notes.routes";
import passport from "passport";
import passportMiddleware from "./middlewares/passport";

let env: Environment = new Environment();

const app: Express = express();
//settings
app.set('port', env.PORT);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(urlencoded({extended: false}));
app.use(json());
app.use(passport.initialize());
passport.use(passportMiddleware);

//Routes
app.get('/', (req: Request, res: Response) => { 
    res.send('Hello World!!!');
});

app.use(authRoutes);
app.use(notesRoutes);

 export default app;