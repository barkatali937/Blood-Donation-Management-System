import { useState } from "react";
import api from "../lib/axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DonationHistoryPage = () => {
  const [name, setName] = useState("");
  const [donors, setDonors] = useState([]);
  const navigate = useNavigate();

  const fetchHistory = async () => {
    if (!name.trim()) {
      toast.error("Please enter donor name");
      return;
    }


    try {
      const res = await api.get(
        `/donors/history/${encodeURIComponent(name)}`
      );
      setDonors(res.data);
    } catch (error) {
      setDonors([]);
      toast.error("No History Found");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black text-white px-6 py-10">

      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            Donation History
          </h2>

          <button
            onClick={() => navigate("/")}
            className="btn-secondary hover:text-red-300 btn-sm "
          >
            Back to Home
          </button>
        </div>

        {/* Search Section */}
        <div className="card bg-base-100 shadow-md border border-base-300 mb-6">
          <div className="card-body flex flex-col md:flex-row gap-4 items-center">

            <input
              type="text"
              placeholder="Enter Donor Name"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button
              onClick={fetchHistory}
              className="btn btn-accent hover:text-red-300"
            >
              Search
            </button>

          </div>
        </div>

        {/* Results */}
        {donors.length > 0 ? (
          <div className="space-y-4">
            {donors.map((donor, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-md border border-base-300"
              >
                <div className="card-body">

                  <h3 className="card-title text-primary">
                    Donation history of {donor.donorName}
                  </h3>

                  <p>
                    <span className="font-semibold">Blood Group:</span>{" "}
                    <span className="badge badge-secondary ml-2">
                      {donor.bloodGroup}
                    </span>
                  </p>

                  <p>
                    <span className="font-semibold">Age:</span> {donor.age}
                  </p>

                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {donor.phoneNumber}
                  </p>

                  <p>
                    <span className="font-semibold">Stats:</span>{" "}
                    {donor.availabilityStatus}
                  </p>

                  <p>
                    <span className="font-semibold">Last Donation:</span>{" "}
                    {new Date(
                      donor.lastDonationDate
                    ).toLocaleDateString()}
                  </p>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center opacity-60 mt-10">
            No history found
          </div>
        )}

      </div>
    </div>
  );
};

export default DonationHistoryPage;