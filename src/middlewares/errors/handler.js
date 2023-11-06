const EErrors = require("../../services/enum.js");

 
const  errorHandler = (error,req,res,next) => {
    switch (error.code) {
        case EErrors.INVALID_TYPES_ERROR:
            res.send({status:"error",error:error.name})
            break;
        default:
            res.send({status:"error",error:"Unhandled error"})
    }
}

module.export = errorHandler 