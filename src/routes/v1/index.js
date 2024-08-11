const express=require('express');
const BookingController = require('../../controllers/booking-controller');
const router=express.Router();

const bookingController=new BookingController();
router.post('/bookings',bookingController.createBooking);
router.post('/bookings/cancel/:id',bookingController.cancelBooking);
router.post('/publish',bookingController.publishToQueue);


module.exports=router;