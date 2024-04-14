class ApiError extends Error{
    constructor(status,message,data=null,stack){
        this.stack=stack,
        this.message=message,
        this.status=status,
        this.data=data
        if(!stack){
            Error.captureStackTrace(this,this.constructor)
        }

    }

}

export default ApiError;