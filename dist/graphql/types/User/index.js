"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = "\n  type User {\n    _id: ID!\n    first_name: String!\n    last_name: String!\n    email: String!\n    password: String!\n    telephones: [Int]!,\n    role: Int\n    status: Int\n  }\n\n  type Query {\n    user(_id: ID, email: String): User!\n    users: [User!]!\n  }\n\n  type Mutation {\n    createUser(user: CreateUserInput!): User!\n    updateUser(_id: String!, user: UpdateUserInput!): Boolean!\n    deleteUser(_id: String!): Boolean!\n  }\n\n  input CreateUserInput {\n    first_name: String!\n    last_name: String!\n    email: String!\n    password: String!\n    telephones: [Int]!,\n    role: Int\n    status: Int\n  }\n\n  input UpdateUserInput {\n    first_name: String\n    last_name: String\n    email: String\n    password: String\n    telephones: [Int],\n    role: Int\n    status: Int\n  }\n";
exports["default"] = _default;