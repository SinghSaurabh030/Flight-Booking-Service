const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../services");


const bookingService=new BookingService;

const createBooking=async (req,res)=>{
    try {
        const response=await bookingService.createBooking(req.body);
        return res.status(StatusCodes.OK).json({
            success:true,
            err:{},
            data:response,
            message:'successfully booked the flight'
        });
    } catch (error) {
        return res.status(error.statusCode).json({
            success:false,
            err:error.explanation,
            data:{},
            message:error.message
        });
    }
}

module.exports={
    createBooking
}