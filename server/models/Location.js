import mongoose from "mongoose";
import { ObjectID } from "mongodb";

const Schema = mongoose.Schema;

ObjectID.prototype.valueOf = function() {
  return this.toString();
};

/* https://mongoosejs.com/docs/geojson.html */

const LocSchema = new Schema({
  code: {
    type: String,
    required: true
  },
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
});

LocSchema.index({ location: "2dsphere" });

export default mongoose.model("Location", LocSchema);
