import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AddDonorPage from "./pages/AddDonorPage";
import EditDonorPage from "./pages/EditDonorPage";
import DonationHistoryPage from "./pages/DonationHistoryPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddDonorPage />} />
        <Route path="/edit/:id" element={<EditDonorPage />} />
        <Route path="/history" element={<DonationHistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;