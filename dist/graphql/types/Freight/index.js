"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = "\n  type Freight {\n    _id: ID!\n    url: String\n    site: String\n    origin: Location!\n    destination: Location!\n    price: String!\n\n    status: Boolean\n    weight: String\n    cargo: String\n    km: String\n    especie: String\n    complement: String\n    tracking: String\n    note: String\n\n    vehicles: [String]\n    bodies: [String]\n    cellphone: [String]\n    telephone: [String]\n    whatsapp: [String]\n    sac: [String]\n    company: Company!\n  }\n\n  type OutputFreight {\n    totalcount: Int!\n    hasnextpage: Boolean!\n    freights: [Freight!]!\n  }\n\n  input InputQueryState {\n    destination: InputCiyStateOptional\n    origin: InputCiyStateOptional\n  }\n\n  input InputCiyStateOptional {\n    city: String\n    state: InputStateOptional\n  }\n\n  input InputCiyStateO {\n    city: String\n    state: InputStateOptional\n  }\n\n  input InputCiyStateR {\n    city: String\n    state: InputStateUFR\n  }\n\n  input InputQueryCityOrigin {\n    destination: InputCiyStateO\n    origin: InputCiyStateR!\n  }\n\n  input InputQueryCityDestination {\n    destination: InputCiyStateR!\n    origin: InputCiyStateO\n  }\n\n  type Query {\n    stateOrigin(filter: InputQueryState): [String!]!\n    stateDestination(filter: InputQueryState): [String!]!\n\n    cityOrigin(filter: InputQueryCityOrigin!): [String!]!\n    cityDestination(filter: InputQueryCityDestination!): [String!]!\n    \n    freight(_id: ID!): Freight!\n    freights(page: Int, perpage: Int, filter: InputFreights): OutputFreight!\n    freightsrange(page: Int, perpage: Int, filter: InputFreightsRange, range: Int!, coordinates: [Float!]!): OutputFreight!\n  }\n\n  input InputFreights {\n    status: Boolean\n    vehicles: [String]\n    bodies: [String]\n    origin: InputLocation\n    destination: InputLocation\n    company: QueryFreigth\n  }\n\n  input InputFreightsRange {\n    status: Boolean\n    vehicles: [String]\n    bodies: [String]\n    company: QueryFreigth\n  }\n\n  input QueryFreigth {\n    _id: ID\n    name: String\n    level: Int\n    status: Int\n  }\n\n  type Mutation {\n    createFreight(freight: CreateFreightInput!): Freight!\n    updateFreight(_id: ID!, freight: UpdateFreightInput!): Boolean!\n    deleteFreight(_id: ID, url: String): Boolean!\n  }\n\n  input CreateFreightInput {\n    url: String\n    site: String\n    origin: inputLocation!\n    destination: inputLocation!\n    status: Boolean\n    weight: String\n    cargo: String\n    price: String\n    km: String\n    especie: String\n    complement: String\n    tracking: String\n    note: String\n    \n    vehicles: [String]!\n    bodies: [String]!\n    cellphone: [String]\n    telephone: [String]\n    whatsapp: [String]\n    sac: [String]\n    company: ID!\n  }\n  \n  input UpdateFreightInput {\n    url: String\n    site: String\n    origin: ID\n    destination: ID\n    status: Boolean\n    weight: String\n    cargo: String\n    price: String\n    km: String\n    especie: String\n    complement: String\n    tracking: String\n    note: String\n\n    vehicles: [String]\n    bodies: [String]\n    cellphone: [String]\n    telephone: [String]\n    whatsapp: [String]\n    sac: [String]\n    company: ID\n  }\n\n  type Subscription {\n    freight: FreightSubscriptionPayload!\n  }\n\n  type FreightSubscriptionPayload {\n    mutation: MutationType!\n    freight: Freight!\n  }\n\n  enum MutationType {\n    CREATED\n    DELETED\n    UPDATED\n  }\n";
exports["default"] = _default;