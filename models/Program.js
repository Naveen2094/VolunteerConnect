import mongoose from "mongoose";

const ProgramSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    shortDesc: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    requiredVolunteers: { type: Number, required: true },
    currentVolunteers: {
      type: Number,
      default: 0,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    startTime: { type: String, required: true, trim: true },
    endTime: { type: String, trim: true },
    image: { type: String },
    status: { type: String, default: "created" },
    createdBy: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("Program", ProgramSchema);
