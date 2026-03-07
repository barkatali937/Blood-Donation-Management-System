import { useState } from "react";
import { toast } from "react-hot-toast";
import api from "../lib/axios";
import { useNavigate } from "react-router-dom";

const DonorForm = ({ existingDonor }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(
    existingDonor || {
      donorName: "",
      bloodGroup: "",
      age: "",
      gender: "",
      phoneNumber: "",
      email: "",
      address: "",
      lastDonationDate: "",
      availabilityStatus: "Available",
    }
  );

  const handleChange = (e) => {setFormData({...formData,[e.target.name]: e.target.value,});};
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (existingDonor) {
        await api.put(`/donors/${existingDonor._id}`, formData);
        toast.success("Donor Updated");
      } else {
        await api.post("/donors", formData);
        toast.success("Donor Added");
      }
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center p-6">
      <form onSubmit={handleSubmit} className="card w-full max-w-3xl bg-base-100 shadow-xl border border-base-300">

        {/* Header */}
        <div className="bg-red-600 text-primary-content py-4 text-center rounded-t-xl">
          <h2 className="text-xl font-semibold">
            {existingDonor ? "Update Donor" : "Add New Donor"}
          </h2>
        </div>
        <div className="card-body grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Donor Name</span>
            </label>
            <input type="text" name="donorName" value={formData.donorName} onChange={handleChange} className="input input-bordered" required />
          </div>

          {/* Blood Group */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Blood Group</span>
            </label>
            <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="select select-bordered" required>
              <option value="">Select Blood Group</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>O+</option>
              <option>O-</option>
              <option>AB+</option>
              <option>AB-</option>
            </select>
          </div>

          {/* Age */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Age</span>
            </label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} className="input input-bordered" required />
          </div>

          {/* Gender */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Gender</span>
            </label>
            <select name="gender" value={formData.grnder} onChange={handleChange} className="select select-bordered" required>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Others</option>
              </select>
        </div>      

          {/* Phone */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="input input-bordered" required />
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="input input-bordered" />
          </div>

          {/* Address */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <textarea name="address" value={formData.address} onChange={handleChange} className="textarea textarea-bordered"></textarea>
          </div>

          {/* Last Donation */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Last Donation Date</span>
            </label>
            <input type="date" name="lastDonationDate" value={formData.lastDonationDate} onChange={handleChange} className="input input-bordered" />
          </div>

          {/* Availability */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Availability</span>
            </label>
            <select name="availabilityStatus" value={formData.availabilityStatus} onChange={handleChange} className="select select-bordered">
              <option>Available</option>
              <option>Not Available</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 p-4 mt-6">
          <button type="button" onClick={() => navigate("/")} className="btn btn-outline border-red-600 hover:bg-red-600 hover:text-white">Cancel</button>

          <button type="submit" className="btn btn-outline border-red-600 hover:bg-red-600 hover:text-white">
            {existingDonor ? "Update Donor" : "Add Donor"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DonorForm;