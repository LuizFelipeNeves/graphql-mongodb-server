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
      required: true
    },
    logo: {
      type: String,
      unique: true,
      required: true
    },
    level: {
      type: Number,
      default: 0
    },
    fretes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Frete"
      }
    ]
  },
  { timestamps: { updatedAt: "updated_at", createdAt: "created_at" } }
);

export default mongoose.model("Company", CompanySchema);
