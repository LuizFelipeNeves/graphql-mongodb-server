import mongoose from "mongoose";
import { ObjectID } from "mongodb";

const Schema = mongoose.Schema;

ObjectID.prototype.valueOf = function() {
  return this.toString();
};

const FreightSchema = new Schema(
  {
    origin: {
      city: {
        type: String,
        required: true
      },
      state: {
        uf: {
          type: String,
          required: true
        },
        name: {
          type: String,
          required: true
        }
      },
      location: {
        type: {
          type: String,
          enum: ["Point"],
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }
    },
    destination: {
      city: {
        type: String,
        required: true
      },
      state: {
        uf: {
          type: String,
          required: true
        },
        name: {
          type: String,
          required: true
        }
      },
      location: {
        type: {
          type: String,
          enum: ["Point"],
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }
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
    url: {
      type: String,
      unique: true
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company"
    },
    site: String
  },
  { timestamps: { updatedAt: "updated_at", createdAt: "created_at" } }
);

FreightSchema.index({
  "origin.location": "2dsphere",
  "destination.location": "2dsphere"
});

export default mongoose.model("Freight", FreightSchema);
