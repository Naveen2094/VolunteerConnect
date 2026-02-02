import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  message: {
    type: String,
    required: true
  },

  // NEW: admin can mark message as read
  status: {
    type: String,
    enum: ["unread", "read"],
    default: "unread"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Contact", contactSchema);
