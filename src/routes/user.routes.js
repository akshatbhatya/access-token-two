import { Router } from "express";
import { logOut, userRegister } from "../controllers/user.controllers.js";
import  upload  from "../middlewares/multer.middlewares.js";
import authHandler from "../middlewares/authMiddleware.js";
const router=Router();

router.route("/register").post(upload.fields([
    {
        name:"avtar",
        maxCount:1
    },
    {
        name:"coverAvtar",
        maxCount:1
    }
]),userRegister);

router.route("/logout",authHandler,logOut);

export default router;