import { Router } from "express";
import { userRegister } from "../controllers/user.controllers.js";
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

router.route("/logout",authHandler,logut);

export default router;