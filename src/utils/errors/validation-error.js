const {StatusCodes}=require('http-status-codes');

class ValidationError extends Error{
    constructor(error)
    {
        super();
        let explanation=[];
        error.errors.forEach((err)=>{
            explanation.push(err.message);
        });
        this.name='ValidationError',
        this.message='not  able to validate data sent in request',
        this.explanation=explanation,
        this.statuaCode=StatusCodes.BAD_REQUEST
    }
}

module.exports=ValidationError;