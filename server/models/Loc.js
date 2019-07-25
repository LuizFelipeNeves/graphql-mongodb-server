import mongoose from "mongoose";
import { ObjectID } from "mongodb";

const Schema = mongoose.Schema;

ObjectID.prototype.valueOf = function() {
  return this.toString();
};

/* https://mongoosejs.com/docs/geojson.html */

const LocSchema = new Schema({
  cidade: {
    type: String,
    required: true
  },
  estado: {
    uf: {
      type: String,
      required: true
    },
    nome: {
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
});

LocSchema.index({ coordinates: "2dsphere" });

export default mongoose.model("Loc", LocSchema);
