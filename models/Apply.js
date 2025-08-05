import mongoose from "mongoose";

const applySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  programInterest: { type: String, required: true },
}, { timestamps: true });

const ApplyModel = mongoose.model("Application", applySchema);

export default ApplyModel;
