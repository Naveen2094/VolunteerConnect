import mongoose from "mongoose";

const ProgramSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    shortDesc: { type: String, required: true },
    longDesc: { type: String, required: true },
    image: { type: String },
    status: {
      type: String,
      enum: ["pending", "verified", "closed"],
      default: "pending",
    },
    createdBy: {
      type: String, // user name or user id
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Program", ProgramSchema);
