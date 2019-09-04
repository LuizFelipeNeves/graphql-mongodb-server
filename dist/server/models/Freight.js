"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _ref;

var Schema = _mongoose["default"].Schema;
var FreightSchema = new Schema((_ref = {
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
        "enum": ["Point"],
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
        "enum": ["Point"],
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
    "default": true
  },
  km: String,
  weight: String,
  price: String,
  cargo: String
}, (0, _defineProperty2["default"])(_ref, "km", String), (0, _defineProperty2["default"])(_ref, "especie", String), (0, _defineProperty2["default"])(_ref, "complement", String), (0, _defineProperty2["default"])(_ref, "tracking", String), (0, _defineProperty2["default"])(_ref, "note", String), (0, _defineProperty2["default"])(_ref, "vehicles", [{
  type: String
}]), (0, _defineProperty2["default"])(_ref, "bodies", [{
  type: String
}]), (0, _defineProperty2["default"])(_ref, "nextel", [{
  type: String
}]), (0, _defineProperty2["default"])(_ref, "cellphone", [{
  type: String
}]), (0, _defineProperty2["default"])(_ref, "telephone", [{
  type: String
}]), (0, _defineProperty2["default"])(_ref, "whatsapp", [{
  type: String
}]), (0, _defineProperty2["default"])(_ref, "sac", [{
  type: String
}]), (0, _defineProperty2["default"])(_ref, "company", {
  type: Schema.Types.ObjectId,
  ref: "Company"
}), (0, _defineProperty2["default"])(_ref, "url", String), (0, _defineProperty2["default"])(_ref, "site", String), _ref), {
  timestamps: {
    updatedAt: "updated_at",
    createdAt: "created_at"
  }
});
FreightSchema.index({
  "origin.location": "2dsphere",
  "destination.location": "2dsphere"
});

var _default = _mongoose["default"].model("Freight", FreightSchema);

exports["default"] = _default;