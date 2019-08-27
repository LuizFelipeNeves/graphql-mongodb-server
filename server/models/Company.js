import mongoose from "mongoose";

const Schema = mongoose.Schema;
const CompanySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },
    logo: {
      type: String, // TODOFIX: Buffer to use base64
      required: true
    },
    level: {
      type: Number,
      default: 0
    },
    status: {
      type: Number,
      default: 0
    }
  },
  { timestamps: { updatedAt: "updated_at", createdAt: "created_at" } }
);

export default mongoose.model("Company", CompanySchema);
