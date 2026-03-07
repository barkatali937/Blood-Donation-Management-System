import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Edit2Icon, Trash2 } from "lucide-react";
import api from "../lib/axios";


const DonorCard = ({ donor, fetchDonors }) => {
  const [deleteId, setDeleteId] = useState(null)
  const handleDelete = async () => {
    try {
      await api.delete(`/donors/${donor._id}`);
      toast.success("Donor Deleted Successfully");
      fetchDonors();
      setDeleteId(null);
    } catch (error) {
      toast.error("Delete Failed");
    }
  };
  const checkEligibility = async () => {
    try {
      const res = await api.get(`/donors/eligibility/${donor._id}`);
      if (res.data.eligible) {
        toast.success("Eligible for donation");
      } else {
        toast.error(res.data.reason || res.data.message || "Not eligible for donation.\nyou must wait 90 days");
      }
    } catch (error) {
      toast.error("Eligibility Check Failed");
    }
  };

  return (
    <div className="bg-white/10 max-auto rounded-2xl p-4 shadow-lg border border-red-500 hover:shadow-red-400/30 transition duration-300">
      <h2 className="text-lg font-bold text-red-400">{donor.donorName}</h2>
      <p>Blood Group: {donor.bloodGroup}</p>
      <p>Age: {donor.age}</p>
      <p>Gender: {donor.gender}</p>
      <p>Phone: {donor.phoneNumber}</p>
      <p>Email: {donor.email}</p>
      <p>Address: {donor.address}</p>
      <p>Last Donation: {donor.lastDonationDate}</p>
      <p>Status: {donor.availabilityStatus}</p>

      <div className="flex gap-2 mt-4">
        <Link to={`/edit/${donor._id}`} title="Edit Donor" className="bg-violet-600 px-3 py-1 rounded hover:bg-violet-500">
          <Edit2Icon size={18} />
        </Link>

        <button onClick={() => setDeleteId(donor._id)} title="Delete Donor" className="bg-red-600 px-3 py-1 rounded hover:bg-red-500"><Trash2 size={18} /></button>
        {deleteId && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-6 rounded-xl w-80 text-center">
              <h2 className="text-lg font-bold text-white mb-4">
                Confirm Delete
              </h2>

              <p className="text-gray-300 mb-6">Are you sure you want to delete this donor?</p>

              <div className="flex justify-center gap-4">
                <button onClick={() => setDeleteId(null)} className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700">Cancel</button>

                <button onClick={() => {
                    handleDelete(deleteId);
                    setDeleteId(null);
                  }}className="px-4 py-2 bg-red-600 rounded hover:bg-red-700">
                    Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <button onClick={checkEligibility} className="bg-yellow-600 px-3 py-1 rounded hover:bg-yellow-500">Eligibility</button>

        <div className="w-full flex justify-end mt-2">
          <p className="text-sm text-amber-700 font-bold">{new Date(donor.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default DonorCard;
