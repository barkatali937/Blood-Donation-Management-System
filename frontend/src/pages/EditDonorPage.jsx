import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../lib/axios";
import DonorForm from "../components/DonorForm";

const EditDonorPage = () => {
  const { id } = useParams();
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonor = async () => {
      try {
        const res = await api.get(`/donors/${id}`);
        setDonor(res.data);
      } catch (error) {
        console.error("Failed to fetch donor");
      } finally {
        setLoading(false);
      }
    };

    fetchDonor();
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black text-white px-6 py-10">
      <div className="container mx-auto px-4 py-8">

        {loading ? (
          <div className="flex justify-center mt-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : donor ? (
          <DonorForm existingDonor={donor} />
        ) : (
          <div className="text-center mt-20 opacity-60">Donor not found</div>
        )}
      </div>
    </div>
  );
};

export default EditDonorPage;