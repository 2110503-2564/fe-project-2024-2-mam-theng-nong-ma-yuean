import mongoose from "mongoose"

const DentistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please add a name'],
        unique: true,
        trim: true,
        maxlength:[50,'Name can not be more than 50 characters']
    },
    image: {
        type: String,
        required: false,
    },
    yearsOfExperience: {
        type: Number,
        required: [true, 'Please add years of experience']
    },
    areaOfExpertise: {
        type: String,
        required: [true, 'Please add an area of expertise']
    },
    bookingPerDay: {
        type: Number,
        default: 1,
        required: [true, 'Please add an maximum booking per day']
    }
},
{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});

const Dentist = mongoose.models.Dentist || mongoose.model("Dentist", DentistSchema);
export default Dentist;