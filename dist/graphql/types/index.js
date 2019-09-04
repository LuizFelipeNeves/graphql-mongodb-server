"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mergeGraphqlSchemas = require("merge-graphql-schemas");

var _User = _interopRequireDefault(require("./User/"));

var _Location = _interopRequireDefault(require("./Location"));

var _Company = _interopRequireDefault(require("./Company"));

var _Freight = _interopRequireDefault(require("./Freight/"));

var typeDefs = [_Location["default"], _Company["default"], _User["default"], _Freight["default"]]; // NOTE: 2nd param is optional, and defaults to false
// Only use if you have defined the same type multiple times in
// different files and wish to attempt merging them together.

var _default = (0, _mergeGraphqlSchemas.mergeTypes)(typeDefs, {
  all: true
});

exports["default"] = _default;