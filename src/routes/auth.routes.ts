import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const authCtrl: AuthController = new AuthController();
const router: Router = Router();

router.post('/signup', authCtrl.SignUp);
router.post('/signin', authCtrl.SignIn);

export default router;