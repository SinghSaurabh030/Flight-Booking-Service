const { StatusCodes } = require('http-status-codes');
const {booking}=require('../models/index');
const { AppError,ValidationError } = require('../utils/errors');

class BookingRepository{
    async create(data){
        try {
            const Booking=await booking.create(data);
            return Booking;  
        } catch (error) {
            if(error.name=='SequelizeValidationError'){
                throw new ValidationError(error);
            }
            throw new AppError(
                'RepositoryError',
                'Cannot create booking',
                'there was some issue please try again later',
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
    async update(bookingId,data){
        try {
            const Booking=await booking.findByPk(bookingId);
            if(data.status){
                Booking.status=data.status;
            }
            await Booking.save();
            return Booking;


        } catch (error) {
            console.log(error);
            throw new AppError(
                'RepositoryError',
                'Cannot create booking',
                'there was some issue please try again later',
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}
module.exports=BookingRepository;