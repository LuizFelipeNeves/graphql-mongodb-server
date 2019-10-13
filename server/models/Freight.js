import mongoose from "mongoose";

const Schema = mongoose.Schema;
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
    cellphone: [{ type: String }],
    telephone: [{ type: String }],
    whatsapp: [{ type: String }],
    sac: [{ type: String }],
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company"
    },
    url: String,
    site: String
  },
  { timestamps: { updatedAt: "updated_at", createdAt: "created_at" } }
);

FreightSchema.index({
  "origin.location": "2dsphere",
  "destination.location": "2dsphere"
});

export default mongoose.model("Freight", FreightSchema);
