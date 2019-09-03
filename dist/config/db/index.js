"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.models = void 0;

var _User = _interopRequireDefault(require("../../models/User"));

var _Company = _interopRequireDefault(require("../../models/Company"));

var _Freight = _interopRequireDefault(require("../../models/Freight"));

var _Location = _interopRequireDefault(require("../../models/Location"));

var models = {
  User: _User["default"],
  Company: _Company["default"],
  Freight: _Freight["default"],
  Location: _Location["default"]
};
exports.models = models;