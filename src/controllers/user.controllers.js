import asyncHandler from "../utils/asyncHandler.js";

const userRegister=asyncHandler((req,res)=>{
    const {username}=req.body;
    console.log(username);

    res.send("ok 200")

});


export {userRegister};