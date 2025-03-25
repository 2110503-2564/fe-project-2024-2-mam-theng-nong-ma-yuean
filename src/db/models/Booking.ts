import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    dentist:{
        type:mongoose.Schema.ObjectId,
        ref:'Dentist',
        required:true
    },
    bookingDate:{
        type: Date,
        required : true
    },
    createAt:{
        type: Date,
        default:Date.now
    }
});

const Booking = mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
export default Booking;