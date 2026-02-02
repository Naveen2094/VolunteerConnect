import mongoose from "mongoose";

const applySchema = new mongoose.Schema(
  {
    // Volunteer who applied
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Program / Event applied for
    programId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
      required: true
    },

    // Keep your old fields (good for display)
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    // Application status
    status: {
      type: String,
      enum: ["applied", "approved", "rejected"],
      default: "applied"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Application", applySchema);
