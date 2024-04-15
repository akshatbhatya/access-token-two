import { Router } from "express";
import { userRegister } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";
const router=Router();

router.route("/register").post(upload(
    
        
        [
            {
                name:"avtar",
                maxCount:1
            },
            {
                name:"coverAvtar",
                maxCount:1
            }
        ]
    
),userRegister);

export default router;