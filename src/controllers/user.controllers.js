import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js"
const userRegister=asyncHandler((req,res)=>{
    const {userName,email,fullName,password}=req.body;
    

    // check all fields are empty or not '

    if([userName,email,fullName,password].some((fields)=>fields?.trim()==="")){
        throw new ApiError(400,"all filds are required not be empty")
    }

    res.send("ok 200")

});


export {userRegister};