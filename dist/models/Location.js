"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

/* https://mongoosejs.com/docs/geojson.html */
var Schema = _mongoose["default"].Schema;
var LocSchema = new Schema({
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
      "enum": ["Point"],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});
LocSchema.index({
  location: "2dsphere"
});

var _default = _mongoose["default"].model("Location", LocSchema);

exports["default"] = _default;