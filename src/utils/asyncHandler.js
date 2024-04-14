const asyncHandler=(handlerFunc)=>{
    return(req,res,next)=>{
        Promise.resolve(handlerFunc(req,res)).catch((err)=>next(err))

    }
};

 export default asyncHandler;