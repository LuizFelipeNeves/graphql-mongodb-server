"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mergeGraphqlSchemas = require("merge-graphql-schemas");

var _User = _interopRequireDefault(require("./User/"));

var _Company = _interopRequireDefault(require("./Company"));

var _Freight = _interopRequireDefault(require("./Freight/"));

var _Location = _interopRequireDefault(require("./Location"));

var resolvers = [_User["default"], _Company["default"], _Freight["default"], _Location["default"]];

var _default = (0, _mergeGraphqlSchemas.mergeResolvers)(resolvers);

exports["default"] = _default;