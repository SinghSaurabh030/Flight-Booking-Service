const express=require('express');
const { bookingController } = require('../../controllers');
const router=express.Router();


router.post('/bookings',bookingController.createBooking);
router.post('/bookings/cancel/:id',bookingController.cancelBooking);



module.exports=router;