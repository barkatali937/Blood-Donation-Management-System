import { useEffect, useState } from "react";
import api from "../lib/axios";
import DonorCard from "../components/DonorCard";
import DonorNotFound from "../components/DonorNotFound";

const HomePage = () => {
  const [donors, setDonors] = useState([]);
  const [bloodGroup, setBloodGroup] = useState("");

  const fetchDonors = async (group) => {
    try {
      let url = "/donors";
      if (group && group !== "") {
        url = `/donors?bloodGroup=${encodeURIComponent(
          group.trim().toUpperCase()
        )}`;
      }
      const res = await api.get(url);
      setDonors(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDonors();
  }, []);

  const handleFilter = (e) => {
    const value = e.target.value;
    setBloodGroup(value);
    fetchDonors(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black text-white px-6 py-10">
      
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-red-500 tracking-wide">Blood Donor List</h1>
      <div className="flex justify-center mb-10">
        <select value={bloodGroup} onChange={handleFilter} className="select select-bordered bg-black border-red-600 text-white focus:outline-none focus:ring-2 focus:ring-red-600 w-64">
          <option value="">All Blood Groups</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
      </div>

      {donors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {donors.map((donor) => (
            <DonorCard
              key={donor._id}
              donor={donor}
              fetchDonors={fetchDonors}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[50vh]"><DonorNotFound /></div>
      )}
    </div>
  );
};

export default HomePage;