import mongoose from "mongoose";
const donorSchema = new mongoose.Schema({
  donorName: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  lastDonationDate: {
    type: Date,
    required: true,
  },
  availabilityStatus: {
    type: String,
    enum: ["Available", "Unavailable"]
  },
}, 
{timestamps: true,}
);

const Donor = mongoose.model("Donor", donorSchema);
export default Donor