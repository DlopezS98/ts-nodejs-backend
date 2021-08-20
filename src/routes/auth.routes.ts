import { Router } from "express";
import { SignIn, SignUp } from "../controllers/users.controller";

const router: Router = Router();

router.post('/signup', SignUp)
router.post('/signin', SignIn)

export default router;