import mongoose from "mongoose";
import { ObjectID } from "mongodb";

const Schema = mongoose.Schema;

ObjectID.prototype.valueOf = function() {
  return this.toString();
};

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
