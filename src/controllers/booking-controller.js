const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../services");
const { createChannel, publishMessage } = require("../utils/messageQueue");
const { REMAINDER_BINDING_KEY } = require("../config/serverConfig");


const bookingService=new BookingService;
class BookingController{
    async publishToQueue(req,res) {
        try {
            const channel=await createChannel();
            const payload={
                data:{
                    subject:"from rabbitmq",
                    content:"this is queue checker",
                    recepientEmail:"singh.saurabh2250@gmail.com",
                    notificationTime:new Date()
                },
                type:"NOTIFICATION"
            };
            publishMessage(channel,REMAINDER_BINDING_KEY,JSON.stringify(payload));
            return res.status(200).json({
                success:true,
                err:{},
                data:payload,
                message:'successfully published to the queue'
            });
        } catch (error) {
            return res.status(500).json({
                success:false,
                err:error,
                data:{},
                message:"cant publish"
            });
        }
    }
    async createBooking (req,res){
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
    async cancelBooking(req,res){
        try {
            const response=await bookingService.cancelBooking(req.params.id);
            return res.status(StatusCodes.OK).json({
                success:true,
                err:{},
                data:response,
                message:'successfully cancelled the flight'
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
    
}
module.exports=BookingController;