import mongoose from "mongoose";
import { ObjectID } from "mongodb";

const Schema = mongoose.Schema;

ObjectID.prototype.valueOf = function() {
  return this.toString();
};

const FreightSchema = new Schema(
  {
    origin: {
      type: Schema.Types.ObjectId,
      ref: "Location"
    },
    destination: {
      type: Schema.Types.ObjectId,
      ref: "Location"
    },
    status: {
      type: Boolean,
      default: true
    },
    km: String,
    weight: String,
    price: String,
    cargo: String,
    km: String,
    especie: String,
    complement: String,
    tracking: String,
    note: String,
    vehicles: [{ type: String }],
    bodies: [{ type: String }],
    nextel: [{ type: String }],
    cellphone: [{ type: String }],
    telephone: [{ type: String }],
    whatsapp: [{ type: String }],
    sac: [{ type: String }],

    company: {
      type: Schema.Types.ObjectId,
      ref: "Company"
    },
    url: {
      type: String,
      unique: true
    },
    site: String
  },
  { timestamps: { updatedAt: "updated_at", createdAt: "created_at" } }
);

export default mongoose.model("Freight", FreightSchema);
