const axios = require('axios');
const {BookingRepository}=require('../respository/index');
const { ServiceError } = require('../utils/errors');

class BookingService{
    constructor(){
        this.bookingRepository=new BookingRepository();
    }
    async createBooking(data){
        try {
            const flightId=data.flightId;
            const flightGetUrl=`http://localhost:3000/api/v1/flights/${flightId}`;
            const response=await axios.get(flightGetUrl);
            const flightData=response.data.data;
            let priceOfFlight=flightData.price;
            if(data.noOfSeats>flightData.totalSeats){
                throw new ServiceError(
                    'something went wrong in booking process',
                    'Insufficient Seats'
                );
            }
            const totalCost=priceOfFlight*data.noOfSeats;
            let bookingPayLoad={...data,totalCost};
            const booking=await this.bookingRepository.create(bookingPayLoad);
            const flightUpdateUrl=`http://localhost:3000/api/v1/flights/${flightId}`;
            const updtResponse=await axios.patch(flightUpdateUrl,
                {
                    totalSeats:flightData.totalSeats-booking.noOfSeats
                }
            );
            const finalBooking=await this.bookingRepository.update(booking.id,{status:"Booked"});
            return finalBooking;
            
        } catch (error) {
            console.log(error);
            if(error.name=='RepositoryError' || error.name=='SequelizeValidationError'){
                throw error;
            }

            throw new ServiceError();
        }
    }
    async cancelBooking(bookingId){
        try {

            const Booking=await this.bookingRepository.getById(bookingId);

            const flightGetUrl=`http://localhost:3000/api/v1/flights/${Booking.flightId}`;
            const response=await axios.get(flightGetUrl);
            const flightData=response.data.data;


            const flightUpdateUrl=`http://localhost:3000/api/v1/flights/${Booking.flightId}`;
            await axios.patch(flightUpdateUrl,
                {
                    totalSeats:flightData.totalSeats+Booking.noOfSeats
                }
            );

            const finalBooking=await this.bookingRepository.update(bookingId,{status:"Cancelled"});
            return finalBooking;

        } catch (error) {
            console.log(error);
            if(error.name=='RepositoryError' || error.name=='SequelizeValidationError'){
                throw error;
            }

            throw new ServiceError();
        }
    }
}
 module.exports=BookingService;