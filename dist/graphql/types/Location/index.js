"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = "\n  type Location {\n    _id: ID!\n    city: String!\n    state: State!\n    location: Position!\n  }\n  type State {\n    uf: String!\n    name: String!\n  }\n  type Position {\n    type: String!\n    coordinates: [Float]!\n  }\n\n  input inputPosition {\n    type: String!\n    coordinates: [Float]!\n  }\n\n  type Query {\n    location(filter: InputLocation): Location!\n    locations(page: Int, perpage: Int, filter: InputLocations): OutputLocations\n  }\n\n  input InputLocation {\n    _id: ID\n    city: String\n    state: InputStateOptional\n  }\n\n  input InputStateOptional {\n    uf: String\n    name: String\n  }\n\n  input InputStateUFR {\n    uf: String!\n    name: String\n  }\n\n  input inputLocation {\n    city: String!\n    state: InputStateUFR!\n    location: inputPosition!\n  }\n\n  input InputLocations {\n    city: String,\n    state: InputStateOptional\n  }\n\n  type OutputLocations {\n    totalcount: Int!\n    hasnextpage: Boolean!\n    locations: [Location!]!\n  }\n";
exports["default"] = _default;