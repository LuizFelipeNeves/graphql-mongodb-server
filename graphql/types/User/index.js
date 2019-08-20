export default `
  type User {
    _id: ID!
    first_name: String!
    last_name: String!
    email: String!
    password: String!
    telephones: [Int]!,
    role: Int
    status: Int
  }

  type Query {
    user(_id: ID, email: String): User!
    users: [User!]!
  }

  type Mutation {
    createUser(user: CreateUserInput!): User!
    updateUser(_id: String!, user: UpdateUserInput!): Boolean!
    deleteUser(_id: String!): Boolean!
  }

  input CreateUserInput {
    first_name: String!
    last_name: String!
    email: String!
    password: String!
    telephones: [Int]!,
    role: Int
    status: Int
  }

  input UpdateUserInput {
    first_name: String
    last_name: String
    email: String
    password: String
    telephones: [Int],
    role: Int
    status: Int
  }
`;
