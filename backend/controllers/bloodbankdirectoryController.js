import { getBloodBankDirectories } from "../models/bloodbankdirectoryModel.js";

export const fetchBloodBankDirectories = async (req, res) => {
  try {
    const { state, district, searchName } = req.query;
    
    if (!state || !district) {
      return res.status(400).json({ message: "State and district are required." });
    }

    const bloodBanks = await getBloodBankDirectories(state, district, searchName);
    res.json(bloodBanks);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};