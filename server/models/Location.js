import mongoose from "mongoose";

/* https://mongoosejs.com/docs/geojson.html */
const Schema = mongoose.Schema;
const LocSchema = new Schema({
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
