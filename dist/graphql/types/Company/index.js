"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = "\n  type Company {\n    _id: ID!\n    name: String!\n    logo: String!\n    level: Int\n    status: Int\n  }\n\n  type Companys {\n    _id: ID!\n    name: String!\n    logo: String!\n    level: Int\n    status: Int\n  }\n\n  input InputCompanys {\n    level: Int\n    name: String\n    status: Int\n  }\n\n  type Query {\n    company(_id: ID, name: String): Company!\n    companys(page: Int, perpage: Int, filter: InputCompanys): [Companys!]!\n  }\n\n  type Mutation {\n    createCompany(company: CreateCompanyInput!): Company!\n    updateCompany(_id: String!, company: UpdateCompanyInput!): Boolean!\n    deleteCompany(_id: String!): Boolean!\n  }\n  input CreateCompanyInput {\n    name: String!\n    logo: String!\n    level: Int\n    status: Int\n  }\n  \n  input UpdateCompanyInput {\n    name: String\n    logo: String\n    level: Int\n    status: Int\n  }\n";
exports["default"] = _default;