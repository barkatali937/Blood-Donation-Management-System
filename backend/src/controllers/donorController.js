import Donor from "../models/donorModel.js";
import {isEligible} from "./eligibilityLogic.js";

export async function addDonor(req, res) {
    try {
        const donor = await Donor.create(req.body);
        res.status(200).json(donor);
    } catch (error) {
        console.error("Error in addDonor controller:", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}
export async function getAllDonors(req, res) {
    try {
        const donors = await Donor.find();
        res.status(200).json(donors);
    } catch (error) {
        console.error("Error in getAllDonors controller:", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}
export async function getDonorById(req, res) {
    try {
        const donor = await Donor.findById(req.params.id);
        if (!donor){
            return res.status(404).json({message: "Donor not Found."});
        }
        res.status(200).json(donor);
    } catch (error) {
        console.error("Error in getDonorById controller:", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}
export async function updateDonor(req, res) {
    try {
        const donor = await Donor.findByIdAndUpdate(req.params.id, req.body, {new: true}); 
        if (!donor){
            return res.status(404).json({message: "Donor not Found."});
        }
        res.status(200).json(donor);
    } catch (error) {
        console.error("Error in updateDonor controller:", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}
export async function deleteDonor(req, res) {
    try {
        const donor = await Donor.findByIdAndDelete(req.params.id, req.body); 
        if (!donor){
            return res.status(404).json({message: "Donor not Found."});
        }
        res.status(200).json(donor);
    } catch (error) {
        console.error("Error in deleteDonor controller:", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}
export async function searchByBloodGroup(req, res) {
    try {
    const donors = await Donor.find(req.query);
    res.status(200).json(donors);
    } catch (error) {
        console.error("Error in searchByBloodGroup controller:", error);
        res.status(500).json({message: error.message, stack: error.stack});
    }
}
export async function checkEligibility(req, res) {
    try {
        const { id } = req.params;
        const donor = await Donor.findById(req.params.id); 
        if (!donor){
            return res.status(404).json({message: "Donor not Found."})
        }
        const eligible = isEligible(donor.lastDonationDate);
        res.status(200).json({donorName: donor.donorName, lastDonationDate: donor.lastDonationDate, eligible});
    } catch (error) {
        console.error("Error in checkEligibility controller:", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}
export async function donationHistory(req, res) {
    try {
        const donors = await Donor.find({donorName: { $regex: req.params.name, $options: "i"}}).select("donorName bloodGroup age phoneNumber lastDonationDate availabilityStatus createdAt");
        if (!donors){
            return res.status(404).json({message: "Donor not Found."});
        }
        res.status(200).json(donors);
    } catch (error) {
        console.error("Error in donationHistory controller:", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}