import express from "express";
import { addDonor, checkEligibility, deleteDonor, donationHistory, getAllDonors, getDonorById, searchByBloodGroup, updateDonor } from "../controllers/donorController.js";


const router = express.Router();

router.post("/", addDonor);
router.get("/all", getAllDonors);
router.get("/:id", getDonorById);
router.put("/:id", updateDonor);
router.delete("/:id", deleteDonor);
router.get("/", searchByBloodGroup);
router.get("/eligibility/:id", checkEligibility);
router.get("/history/:name", donationHistory)

export default router;