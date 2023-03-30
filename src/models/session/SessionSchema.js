import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "active",
    },
    token: {
      type: String,
      default: "",
    },

    associate: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Session", sessionSchema);
