"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var CompanySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  logo: {
    type: String,
    // TODOFIX: Buffer to use base64
    required: true
  },
  level: {
    type: Number,
    "default": 0
  },
  status: {
    type: Number,
    "default": 0
  }
}, {
  timestamps: {
    updatedAt: "updated_at",
    createdAt: "created_at"
  }
});

var _default = _mongoose["default"].model("Company", CompanySchema);

exports["default"] = _default;