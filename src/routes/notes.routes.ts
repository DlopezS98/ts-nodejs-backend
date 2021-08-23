import { Router } from "express";
import { authenticate } from "passport";

const router: Router = Router();
router.get("/notes", authenticate('jwt', { session: false }), (req, res) => {
    res.send("Success!");
})

export default router;