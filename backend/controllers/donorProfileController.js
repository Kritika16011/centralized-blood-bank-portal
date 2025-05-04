import { getDonorProfileByEmail, upsertDonorProfile } from '../models/donorProfileModel.js';

// Fetch donor profile details
export const fetchDonorProfile = async (req, res) => {
  try {
      const email = req.email || req.params.email; // Extract from fixed route
      if (!email) {
          return res.status(400).json({ message: "Email is required" });
      }

      const donorProfile = await getDonorProfileByEmail(email);
      if (!donorProfile) {
          return res.status(404).json({ message: "Donor not found" });
      }

      res.status(200).json(donorProfile);
  } catch (error) {
      console.error("Error fetching donor profile:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};

// Update or create donor profile

export const updateDonorProfile = async (req, res) => {
  try {
    const donorData = req.body;
    console.log("Received Data:", donorData); // Log the incoming request data

    const updatedDonor = await upsertDonorProfile(donorData);

    res.json({ message: "Profile updated successfully", donor: updatedDonor });
  } catch (error) {
    console.error("Update Error:", error); // Log the actual error for debugging

    res.status(500).json({ 
      message: "Error updating profile", 
      error: error.message || error 
    });
  }
};

