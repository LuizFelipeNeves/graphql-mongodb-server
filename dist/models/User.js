"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

// import bcrypt from "bcrypt";
var Schema = _mongoose["default"].Schema;
var UserSchema = new Schema({
  first_name: {
    type: String,
    require: true
  },
  last_name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  telephones: [Number],
  role: {
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
UserSchema.pre("save",
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(next) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            /*
            const hash = await bcrypt.hash(this.password, 10);
            this.password = hash;
            */
            next();

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

var _default = _mongoose["default"].model("User", UserSchema);

exports["default"] = _default;